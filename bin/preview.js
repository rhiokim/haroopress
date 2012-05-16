#!/usr/bin/env node

var exec = require('child_process').exec,
    path = require('path'),
    conf = require('../config'),
    colors = require('colors');

var docroot = path.relative(process.cwd(), conf.publicDir);

switch(process.platform) {
    case 'darwin' :
        console.log('haroo> execuate local static webserver¶'.yellow);

        exec('locally -w '+ docroot +' -p 8081', function(code, stdout, stderr) {
        });
        

        console.log('haroo> open http://localhost:8081 ¶'.yellow);
        var child = exec('open http://localhost:8081', function(code, stdout, stderr) {
            child.kill();
        });
         
    break;
    case 'win32' :
    break;
}
