#!/usr/bin/env node

var exec = require('child_process').exec,
    spawn = require('child_process').spawn,
    fork = require('child_process').fork,
    conf = require('../config'),
    colors = require('colors');


switch(process.platform) {
    case 'darwin' :
        console.log('>>execuate local static webserver¶'.yellow);
        console.log('locally -w '+ conf.publicDir +' -p 8081');

        exec('locally -w '+ conf.publicDir +' -p 8081', function(code, stdout, stderr) {
            console.log(stdout.white);

            if(!err) {
           }
        });

        console.log('open http://localhost:8081 ¶'.yellow);
        exec('open http://localhost:8081', function(code, stdout, stdin) {});
         
    break;
    case 'win32' :
    break;
}

