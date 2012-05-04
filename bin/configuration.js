#!/usr/bin/env node

var fs = require('fs'),
    rl = require('readline'),
    conf = require('../_config'),
    colors = require('colors');

var i = rl.createInterface(process.stdin, process.stdout, null);
var metas = [
    { key: 'defaultTitle', question: '<title>[defaultTitle]</title>' },
    { key: 'description', question: '<meta description="[description]"/>' },
    { key: 'siteUrl', question: 'Site Url (e.g. http://site.com)' },
    { key: 'author', question: 'Who are you? (matched source/data/authors/[author_name].markdown)' },
    { key: 'keywords', question: '<meta name="keyword" content="'+ '[value]'.cyan +'" />'}
];

var config = [
    { key: 'lang', question: 'lang'},
    { key: 'contentLength', question: 'contentLength'},
    { key: 'CNAME', question: 'CNAME'},
    { key: 'sourceDir', question: 'sourceDir'},
    { key: 'theme', question: 'basic'}
];

function setMeta(key, value) {
    conf.meta[key] = value;
}

function setConf(key, value) {
    conf[key] = value;
}

function printConfig() {
    var res;

    res = JSON.stringify(conf, null, 4);

    console.log(res);
    return 'module.exports = '+ res;
}

function save() {
    var str = printConfig();

    i.question('haroo> Save? [y/n] : '.yellow, function(answer) {
        if(answer == 'y') {
            //TODO file save
            fs.writeFileSync('./config.js', str, 'utf8');
        } else {
        }

        i.close();
        process.stdin.destroy();
        
    });
}

function queue(idx) {
    var msg, item;
    
    idx = idx || 0;
    item = metas[idx];

    if(!item) {
        save(); 
        return;
    }

    msg = 'haroo> '+ item.question +' :';
    key = item.key;

    i.question(msg.yellow, function(answer) {
        if (key == 'keywords') {
            answer = answer.split(',');
        }
        setMeta(key, answer);
        queue(++idx);
    });
}

queue();
