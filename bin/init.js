#!/usr/bin/env node

var fs = require('fs'),
    exec = require('child_process').exec,
    mkdirp = require('mkdirp'),
    path = require('path'),
    colors = require('colors'),
    conf = require('../config');

process.chdir(__dirname);

function init() {
    exec('cp -R _init '+ conf.sourceDir, function(code, stdout, stderr) {
        exec('mv ../source/_init ../source/data', function(code, stdout, stderr) {
            console.log('haroo> created initial data'.yellow);
            process.chdir(conf.sourceDir);

            exec('git init', function(code, stdout, stderr) {
                console.log('haroo> site data initialized'.yellow);
            });

            //init your profile
            exec('mv ./authors/yours.markdown ./authors/'+ conf.meta.author +'.markdown', function(code, stdout, stderr) {
                console.log('haroo> create your profile markdown');
            });
        });
    });
}

if(!path.existsSync(conf.sourceDir)) {
    init();
}
