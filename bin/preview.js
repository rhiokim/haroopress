#!/usr/bin/env node

var exec = require('child_process').exec,
    path = require('path'),
    readline = require('readline'),
    conf = require('../config'),
    colors = require('colors');

var isExec = false;

var rl = readline.createInterface(process.stdin, process.stdout, null);

function destroyReadLine() {
    rl.close();
    process.stdin.destroy();
}

/**
 * process execute
 *
 * @param {Number} port
 * @author nanhapark
 */
function preview(port) {
  var spawn = require('child_process').spawn,
      web    = spawn('./node_modules/.bin/locally', ['-w', './_public', '-p', port]);

  web.stdout.on('data', function (data) {
      openBrowser();
    });

  web.stderr.on('data', function (data) {
      destroyReadLine();
      console.log(data.red);
    });

  web.on('exit', function (code) {
      destroyReadLine();
      console.log('haroo> child process exited with code ' + code);
    });
}

function openBrowser() {
    if(isExec) {
        return;
    }
    isExec = true;

    rl.question('Do you want check on the browser? [y(es)/n] : ', function(answer) {
        answer = answer.toLowerCase();

        if(answer.match(/^y(es)?$/i)) {
            var child = exec('Open http://localhost:'+ conf.defaultPort, function(code, stdout, stderr) {
                child.kill();
            });
        } else {
            console.log('haroo> You can check your site on the web browser.'.yellow, '( Stop server : ^C )'.underline);
        }

        destroyReadLine();
    });
}


console.log('haroo> Start server at http://localhost:%s ¶'.yellow, conf.defaultPort);

switch(process.platform) {
    case 'darwin' :
        preview(conf.defaultPort);
    break;
    case 'linux' :
        preview(conf.defaultPort);
    break;
    case 'win32' :
    break;
}

