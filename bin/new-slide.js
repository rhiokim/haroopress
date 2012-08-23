#!/usr/bin/env node

var fs = require('fs'),
    readline = require('readline'),
    stringEx = require('stringex'),
    mkdirp = require('mkdirp'),
    colors = require('colors'),
    conf = require('../config');

var rl = readline.createInterface(process.stdin, process.stdout, null);
rl.question('haroo> Input slide title : ', function(title) {
    var fileStream = fs.readFileSync('_template/sample-slide.markdown', 'utf8');
    var arr = fileStream.split('\n\n');
    var head = arr.shift(),
        body = arr.join('\n\n');
    title = title && title.trim();

    head = JSON.parse(head);
    head.title = title;
    head.author = conf.meta.author;

    title = stringEx.stripHtmlTags(title);
    title = stringEx.toASCII(title);
    title = stringEx.toUrl(title);

    //이미 작성된 슬라이드가 있는지 체크
    try {
        var stat = fs.statSync(conf.sourceDir +'/slides/'+ title +'/index.markdown');
        if (stat.isFile()) {
            console.log('existed slide');

            rl.close();
            process.stdin.destroy();
        }
    } catch(e) {
    }

    rl.question('haroo> Input slide category : ', function(categories) {
        if(categories.length) {
            categories = categories.split(',');
            categories = categories.map(function(category) {
                return category.trim();
            });

            head.categories = categories;
        }
        
        rl.question('haroo> Input slide tag (e.g tag1, tag2, tag3) : ', function(tags) {
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
            var path = conf.sourceDir +'/slides/'+ title;
            mkdirp.sync(path, 0755);
            mkdirp.sync(path +'/@img', 0755);
            fs.writeFileSync(path +'/index.markdown', header +'\n\n'+ body, 'utf8');
            
            console.log('haroo> write slide -> %s/index.markdown'.yellow, path);
            console.log('haroo> slide\'s image path %s/@img'.yellow, path);

            rl.close();
            process.stdin.destroy();

        });
    });
});

