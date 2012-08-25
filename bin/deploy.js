#!/usr/bin/env node

var exec = require('child_process').exec,
    fs = require('fs'),
    colors = require('colors'),
    rl = require('readline'),
    conf = require('../config');

var deployMessage = process.argv[2];
process.chdir(conf.deployDir);

//create CNAME file
if(conf.CNAME.length > 4) {
    fs.writeFileSync('./CNAME', conf.CNAME, 'utf8');
}

console.log('haroo> Resources copy to Deploy directory'.yellow);

exec('cp -R '+ conf.publicDir +'/* '+ conf.deployDir, function(code, stdout, stderr) {
    console.log('haroo> git add .¶'.yellow);
    exec('git add .', function(code, stdout, stderr) {
        console.log(stdout.white);
        console.log('haroo> git add -u¶'.yellow);
        exec('git add -u', function(code, stdout, stderr) {
            console.log(stdout.white);
            console.log('haroo> git commit -m ¶'.yellow);
            var message = deployMessage || 'Site updated at '+ new Date();
            exec('git commit -m "'+ message +'"', function(code, stdout, stderr) {
                console.log(stdout.white);
                console.log('haroo> git push origin master --force¶'.yellow);
                exec('git push origin master --force', function(code, stdout, stderr) {
                    console.log(stdout.white);   
                    console.log('haroo> completed %s'.yellow, conf.meta.siteUrl);

                    var i = rl.createInterface(process.stdin, process.stdout, null);
                    i.question('haroo>'.yellow +' open '+ conf.meta.siteUrl +' ? [y/n]', function(answer) {
                        if(answer == 'y') {
                            exec('open '+ conf.meta.siteUrl);
                        }
                        i.close();
                        process.stdin.destroy();
                    });
                });
            });
        });
    });
});


