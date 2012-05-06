#!/usr/bin/env node

var exec = require('child_process').exec,
    fs = require('fs'),
    path = require('path'),
    mkdirp = require('mkdirp');
    readline = require('readline'),
    findit = require('findit'),
    conf = require('../../config');

var files, rl,
    sourceDir = path.resolve(conf.sourceDir, 'articles');

rl = readline.createInterface(process.stdin, process.stdout, null);
rl.question('Please! insert octopress article directory : ', function(destDir) {

    //TODO exception 
    if(!path.existsSync(destDir)) {
        throw new Error('No Directory');
        
        rl.close();
        process.exit();
    }

    var file, articleDir, articleName;
    files = findit.sync(destDir);
    files.forEach(function(filePath) {
        articleDir = path.dirname(filePath);
        articleName = path.basename(filePath, '.markdown');

        articleName = articleName.split('-')
        articleName.splice(0, 3);
        articleName = articleName.join('-');

        file = path.join(sourceDir, articleName);

        if(path.existsSync(file)) {
            
        }

        mkdirp.sync(file);
        exec('cp -R '+ filePath +' '+ file +'/index.markdown');
        mkdirp.sync(file +'/@img');
    });
});

