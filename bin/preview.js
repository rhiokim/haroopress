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
        console.log('haroo> Start server at http://localhost:8081 ¶'.yellow);

        exec('locally -w '+ docroot +' -p 8081', function(code, stdout, stderr) {
        });
        
        rl.question('Show me the browser? [y/n] : ', function(answer) {

            if(answer == 'y') {
                var child = exec('Open http://localhost:8081', function(code, stdout, stderr) {
                    console.log('haroo> open http://localhost:8081 ¶'.yellow);
                    child.kill();
                });
            } else {
                console.log('haroo> Ok!');
            }

            rl.close();
            process.stdin.destroy();
        });

    break;
    case 'win32' :
    break;
}
