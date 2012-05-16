#!/usr/bin/env node

var exec = require('child_process').exec,
    path = require('path'),
    step = require('step'),
    colors = require('colors'),
    conf = require('../config');

var sourceDir = path.resolve(conf.themeDir, conf.theme.name, 'public');
var sourceJS = path.resolve(sourceDir, 'js');
var sourceCSS = path.resolve(sourceDir, 'css');

console.log(sourceDir);

function log(msg, color) {
    msg = 'haroo> '+ msg +'¶';
    console.log(msg.yellow);
}

function log2(msg) {
    if(msg == '') {
        return;
    }

    console.log(msg.white);
}

function initBootstrap() {
    log('remove twitter bootstrap build files');
    exec('rm -rf ../lib/bootstrap/bootstrap/', this);
}

function buildBootstrap(err, stdout, stdin) {
    log('build twitter bootstrap');
    process.chdir('../lib/bootstrap');
    exec('make bootstrap', this);
}

function copyBootstrap(err, stdout, stdin) {
    log2(stdout);
    log('built bootstrap file copy to '+ sourceDir);
    process.chdir(__dirname);
    exec('cp -R ../lib/bootstrap/bootstrap/* '+ sourceDir, this);
}

function buildjQuery(err, stdout, stdin) {
    log2(stdout);
    log('build jQuery');
    process.chdir('../lib/jquery');
    exec('make', this);
}

function copyjQuery(err, stdout, stdin) {
    log2(stdout);
    log('built jQuery files copy to '+ sourceDir);
    process.chdir(__dirname);
    exec('cp ../lib/jquery/dist/* '+ sourceJS, this);
}

function copyRequireJS(err, stdout, stdin) {
    log2(stdout);
    log('built requirejs core files copy to '+ sourceJS);
    exec('cp ../lib/requirejs/require.js '+ sourceJS, this);
}

function copyRequireJS2(err, stdout, stdin) {
    log2(stdout);
    log('built requirejs text.js files copy to '+ sourceJS);
    exec('cp ../lib/requirejs/text.js '+ sourceJS, this);
}

function copyTOC(err, stdout, stdin) {
    log2(stdout);
    log('built toc files copy to '+ sourceJS);
    exec('cp ../lib/toc/toc.js '+ sourceJS, this);
}

function copyJSONP(err, stdout, stdin) {
    log2(stdout);
    log('built jquery-jsonp files copy to '+ sourceJS);
    exec('cp ../lib/jquery-jsonp/src/jquery.jsonp.js '+ sourceJS, this);
}

function buildCodePretty(err, stdout, stdin) {
    log2(stdout);
    log('build google code prettify');
    process.chdir('../lib/google-code-prettify');
    exec('make', this);
}

function copyCodePrettyJS(err, stdout, stdin) {
    log2(stdout);
    log('built prettifer js files copy to '+ sourceJS);
    process.chdir(__dirname);
    exec('cp ../lib/google-code-prettify/*.js '+ sourceJS, this);
}

function copyCodePrettyCSS(err, stdout, stdin) {
    log2(stdout);
    log('built prettifer css files copy to '+ sourceCSS);
    exec('cp ../lib/google-code-prettify/*.css '+ sourceCSS, this);
}

function copyMustache(err, stdout, stdin) {
    log2(stdout);
    log('Mustache files copy to '+ sourceJS);
    exec('cp ../lib/mustache/mustache.js '+ sourceJS, this);
}

function end(err, stdout, stdin) {
    log2(stdout);
    log('build completed');
}

step(initBootstrap, buildBootstrap, copyBootstrap, buildjQuery, copyjQuery, copyRequireJS, copyRequireJS2, copyTOC, copyJSONP, buildCodePretty, copyCodePrettyJS, copyCodePrettyCSS, copyMustache, end);
