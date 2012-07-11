#!/usr/bin/env node

var fs = require('fs'),
    exec = require('child_process').exec,
    mkdirp = require('mkdirp'),
    path = require('path'),
    colors = require('colors'),
    conf = require('../config');

process.chdir(__dirname);

function init() {
    var profile, head;

    exec('cp -R _init '+ conf.sourceDir, function(code, stdout, stderr) {
        exec('mv ../source/_init ../source/data', function(code, stdout, stderr) {
            console.log('haroo> created initial data'.yellow);
            process.chdir(conf.sourceDir);

            exec('git init', function(code, stdout, stderr) {
                console.log('haroo> site data initialized'.yellow);
            });

            profile = fs.readFileSync('./authors/yours.markdown', 'utf8');
            profile = profile.split('\n\n');
            head = JSON.parse(profile[0]);
            head.name = conf.meta.author;
            head.email = conf.meta.email;
            head.blog = conf.meta.siteUrl;
            profile[0] = JSON.stringify(head, null, 4);
            profile = profile.join('\n\n');

            fs.writeFile('./authors/'+ conf.meta.author +'.markdown', profile, 'utf8', function() {
                //init your profile
                exec('rm -rf ./authors/yours.markdown', function(code, stdout, stderr) {});
                //exec('cp ./authors/yours.markdown ./authors/'+ conf.meta.author +'.markdown', function(code, stdout, stderr) {
                //    console.log('haroo> create your profile markdown');
                //});
            });
        });
    });
}

if(!path.existsSync(conf.sourceDir)) {
    init();
}
