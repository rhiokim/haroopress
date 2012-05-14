#!/usr/bin/env node

var exec = require('child_process').exec,
    path = require('path'),
    watch = require('watch'),
    conf = require('../config'),
    colors = require('colors'),
    gen = require('../lib/generator'),
    PostParser = require('../lib/parse-article'),
    AuthorParser = require('../lib/parse-author');

var docroot = path.relative(process.cwd(), conf.publicDir);

switch(process.platform) {
    case 'darwin' :
        console.log('haroo> execuate local static webserver¶'.yellow);

        exec('locally -w '+ docroot +' -p 8081', function(code, stdout, stderr) {
        });
        

        console.log('haroo> open http://localhost:8081 ¶'.yellow);
        var child = exec('open http://localhost:8081', function(code, stdout, stderr) {
            child.kill();
        });
         
    break;
    case 'win32' :
    break;
}

/**
 * instantly preview
 */
var watchDir = path.resolve(conf.sourceDir, 'articles');

function genArticle() {
    gen.clone(function() {
        gen.archive();
    });
}

function getAuthorFile(id) {
    return path.join(conf.sourceDir, 'authors') + '/'+ id +'.markdown';
}

watch.watchTree(watchDir, function(f, curr, prev) {
    if (typeof f == "object" && prev === null && curr === null) {
    } else if (prev === null) {
        // f is a new file
    } else if (curr.nlink === 0) {
        // f was removed
    } else {
        console.log('haroo> changed %s'.yellow, f.replace(conf.sourceDir, ''));
        var article = PostParser.parse(f);
        var author = AuthorParser.parse(getAuthorFile(article.head.author));
        console.log(article, author);
    }
});
console.log('haroo> watching source directory'.yellow);
