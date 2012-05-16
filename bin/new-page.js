#!/usr/bin/env node

var fs = require('fs'),
    readline = require('readline'),
    stringEx = require('stringex'),
    mkdirp = require('mkdirp'),
    colors = require('colors'),
    conf = require('../config');

var rl = readline.createInterface(process.stdin, process.stdout, null);
rl.question('haroo> Enter page title : ', function(title) {
    var file = fs.readFileSync('_template/sample-page.markdown', 'utf8');
    var head = file.split('\n\n'),

    title = title && title.trim();

    head = JSON.parse(head[0]);
    head.title = title;
    head.author = conf.meta.author;

    title = stringEx.stripHtmlTags(title);
    title = stringEx.toASCII(title);
    title = stringEx.toUrl(title);

    //이미 작성된 아티클이 있는지 체크
    try {
        var stat = fs.statSync(conf.sourceDir +'/pages/index.markdown');
        if (stat.isFile()) {
            console.log('existed page');

            rl.close();
            process.stdin.destroy();
        }
    } catch(e) {
    }

    rl.question('haroo> Enter page category (e.g cate1, cate2, cate3 ) : ', function(categories) {
        if(categories.length) {
            categories = categories.split(',');
            categories = categories.map(function(category) {
                return category.trim(); 
            });

            head.categories = categories;
        }
        
        rl.question('haroo> Enter page tag (e.g tag1, tag2, tag3) : ', function(tags) {
            var path = conf.sourceDir +'/pages/'+ title;

            if(tags.length) {
                tags = tags.split(',');
                tags = tags.map(function(tag) {
                    return tag.trim();
                });

                head.tags = tags;
           }

            head.date = new Date();
            head.published = head.date;
           
            //TODO: double quotation!!
            var header = JSON.stringify(head, null, 4);
            mkdirp.sync(path, 0755);
            mkdirp.sync(path +'/@img', 0755);
            fs.writeFileSync(path +'/index.markdown', header +'\n\ncontent here!', 'utf8');
            
            console.log('haroo> created -> %s/index.markdown'.yellow, path);
            console.log('haroo> page\'s image path %s/@img'.yellow, path);

            rl.close();
            process.stdin.destroy();

        });
    });
});

