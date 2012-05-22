#!/usr/bin/env node

var exec = require('child_process').exec,
    path = require('path'),
    readline = require('readline'),
    conf = require('../config'),
    colors = require('colors');

var docroot = path.relative(process.cwd(), conf.publicDir);

var rl = readline.createInterface(process.stdin, process.stdout, null);

switch(process.platform) {
    case 'darwin' :
        console.log('haroo> execuate local static webserver¶'.yellow);
        console.log('haroo> open http://localhost:8081 ¶'.yellow);

        exec('locally -w '+ docroot +' -p 8081', function(code, stdout, stderr) {
        });
        
        rl.question('Do you want open browser? [y/n] : ', function(answer) {

            if(answer == 'y') {
                console.log('haroo> open http://localhost:8081 ¶'.yellow);
                var child = exec('open http://localhost:8081', function(code, stdout, stderr) {
                    child.kill();
                });
            }

            rl.close();
            process.stdin.destroy();
        });

    break;
    case 'win32' :
    break;
}
