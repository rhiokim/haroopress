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
        });
    });
}

if(!path.existsSync(conf.sourceDir)) {
    init();
}
