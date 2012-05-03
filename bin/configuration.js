#!/usr/bin/env node

var fs = require('fs'),
    rl = require('readline'),
    conf = require('../_config'),
    colors = require('colors');

var i = rl.createInterface(process.stdin, process.stdout, null);
var metas = [
    { key: 'defaultTitle', question: '<title>?</title>' },
    { key: 'description', question: '<meta description="?"/>' },
    { key: 'siteUrl', question: 'Site Url (e.g. http://site.com)' },
    { key: 'author', question: 'Who are you? (matched source/data/authors/[author_name].markdown)' },
    { key: 'keyword', question: '<meta name="keyword" content="'+ '[value]'.cyan +'" />'}
];

var config = [
    { key: 'lang', question: ''},
    { key: 'contentLength', question: ''},
    { key: 'CNAME', question: ''},
    { key: 'sourceDir', question: ''},
    { key: 'theme', question: ''},
    { key: '', question: ''}
];

function setMeta(key, value) {
    conf.meta[key] = value;
}

function setConf(key, value) {
    conf[key] = value;
}

function printConfig() {
    var res;

    delete conf.plugins;
    res = JSON.stringify(conf, null, 4);
    console.log(res);
}

function save() {
    printConfig();

    i.question('haroo> Save? [y/n] : '.yellow, function(answer) {
        if(answer == 'y') {
            //TODO file save
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
        setMeta(key, answer);
        queue(++idx);
    });
}

queue();
