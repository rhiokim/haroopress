#!/usr/bin/env node

var exec = require('child_process').exec,
    mkdirp = require('mkdirp'),
    conf = require('../config');

//clear deploy directory
exec('rm -rf '+ conf.deployDir, function(err, stdout, stdin) {
    if(!err) {
        mkdirp.sync(conf.deployDir);
    }
});

//clear public test directory
exec('rm -rf '+ conf.publicDir, function(err, stdout, stdin) {
    if(!err) {
        mkdirp.sync(conf.publicDir);
    }
});
