#!/usr/bin/env node

var exec = require('child_process').exec,
    path = require('path'),
    readline = require('readline'),
    conf = require('../config'),
    colors = require('colors');

var rl = readline.createInterface(process.stdin, process.stdout, null);

function destroyReadLine() {
    rl.close();
    process.stdin.destroy();
}

switch(process.platform) {
    case 'darwin' :
        console.log('haroo> Start server at http://localhost:%s ¶'.yellow, conf.defaultPort);

        exec('./node_modules/.bin/locally -w ./_public -p '+ conf.defaultPort, function(code, stdout, stderr) {
            
            if(stderr) {
                destroyReadLine();
                console.log(stderr.red);
                return;
            }

            
        });

        rl.question('Show me the browser? [y/n] : ', function(answer) {
            answer = answer.toLowerCase();

            if(answer != 'n' || answer != 'no') {
                var child = exec('Open http://localhost:'+ conf.defaultPort, function(code, stdout, stderr) {
                    child.kill();
                });
            } else {
                console.log('haroo> started web sever!');
            }

            destroyReadLine();
        });
        
    break;
    case 'win32' :
    break;
}
