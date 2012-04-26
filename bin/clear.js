#!/usr/bin/env node

var exec = require('child_process').exec,
    mkdirp = require('mkdirp'),
    conf = require('../config'),
    colors = require('colors');

//clear deploy directory
console.log('haroo> clear to deploy directory¶'.yellow);
exec('rm -rf '+ conf.deployDir +'/*', function(code, stdout, stderr) {
    if(!stderr) {
        mkdirp.sync(conf.deployDir);
    }
});

//clear public test directory
console.log('haroo> clear to public directory'.yellow);
exec('rm -rf '+ conf.publicDir, function(code, stdout, stderr) {
    if(!stderr) {
        mkdirp.sync(conf.publicDir);
    }
});
