#!/usr/bin/env node

var exec = require('child_process').exec,
    spawn = require('child_process').spawn,
    fork = require('child_process').fork,
    path = require('path'),
    conf = require('../config'),
    colors = require('colors');

var docroot = path.relative(process.cwd(), conf.publicDir);

switch(process.platform) {
    case 'darwin' :
        console.log('>>execuate local static webserver¶'.yellow);
        console.log('locally -w '+ docroot +' -p 8081');

        exec('locally -w '+ docroot +' -p 8081', function(code, stdout, stderr) {
            console.log(stdout.white);
        });
        

        console.log('open http://localhost:8081 ¶'.yellow);
        exec('open http://localhost:8081', function(code, stdout, stderr) {});
         
    break;
    case 'win32' :
    break;
}

