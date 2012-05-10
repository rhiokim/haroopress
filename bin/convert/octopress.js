#!/usr/bin/env node

var exec = require('child_process').exec,
    fs = require('fs'),
    path = require('path'),
    mkdirp = require('mkdirp');
    readline = require('readline'),
    findit = require('findit'),
    colors = require('colors'),
    yaml = require('yaml'),
    step = require('step'),
    conf = require('../../config');

var files, rl,
    sourceDir = path.resolve(conf.sourceDir, 'articles');

function removeDate(filename) {
    filename = filename.split('-');
    filename.splice(0, 3);
    filename = filename.join('-');

    return filename;
}

function mergeHead(source) {
    var prop,
        model = require('../_template/sample-post');

    model.status = 'public';
    model.author = conf.meta.author;

    for(prop in source) {
        switch(prop) {
            case 'date':
                model[prop] = new Date(source[prop]);
                model.published = model[prop];
                break;
            case 'categories':
                var type = typeof source[prop];

                if(type == 'string') {
                    model[prop] = [source[prop]];
                } else if(type == 'undefined') {
                    model[prop] = [];
                } else {
                    model[prop] = source[prop];
                }
                break;
            case 'layout':
//                model.advanced[prop] = source[prop];
                break;
            case 'comments':
                model.acceptComment = source[prop];
                break;
            default:
                model[prop] = source[prop];
                break;
        }
    }

    return model;
}

function parseHead(str) {
    var header;

    header = str.split('\n');
    header.shift();
    header.pop();
    header = header.map(function(line) {
        if(line.indexOf('date:') > -1) {
            return '  date: "'+ line.replace('date: ','') +'"';
        }
        return '  '+ line;
    });
    header = header.join('\n');
    header = [''].concat('\n'+header).join('---') +'\n';

    header = yaml.eval(header);
    header = mergeHead(header);
    header = JSON.stringify(header, null, 4);

    return header;
}

var Image = require('./octopress/image'),
    Code = require('./octopress/code');

var image = new Image();
var code = new Code();

function parseBody(str) {
    var res;
    res = image.toMarkdown(str);
    res = code.toMarkdown(res);

    return res;
}

function convert(file) {
    var raw, header, body, post;

    raw = fs.readFileSync(file, 'utf8');
    raw = raw.split('---');
    
    raw.shift();

    header = parseHead(raw.shift());
    body = parseBody(raw.join('---'));
    post = header + '\n\n';
    post += body;

    return post;
}

function complete(path) {
    console.log('a')
}
function parse(file) {
    var post, destDir, destName, sourcePath;

    destDir = path.dirname(file);
    destName = removeDate(path.basename(file, '.markdown'));

    if(!destName) {
        if(files.length) {
            parse(files.shift());
        }
        return;
    } 

    sourcePath = path.join(sourceDir, destName);

    // 디렉토리 생성
    mkdirp.sync(sourcePath);
    console.log('haroo> create directory at %s'.yellow, sourcePath);

    mkdirp.sync(sourcePath +'/@img');
    console.log('haroo> create image directory at %s'.yellow, sourcePath +'/@img');

    // 파일복사 
    console.log('haroo> copy to %s.markdown file'.yellow, destName);
    exec('cp '+ file +' '+ sourcePath +'/index.markdown', function(err, stdout, stderr) {
        post = convert(sourcePath +'/index.markdown');

        console.log('haroo> jekyll convert to haroopress'.cyan);
        fs.writeFileSync(sourcePath +'/index.markdown', post, 'utf8');

        console.log('----------------------------------------------------------------');

        if(files.length) {
            parse(files.shift());
        } else {
            rl.close();
            process.exit();
        }
    }); 
}

rl = readline.createInterface(process.stdin, process.stdout, null);
rl.question('Please! insert octopress article directory : ', function(destDir) {

    //TODO exception 
    if(!path.existsSync(destDir)) {
        throw new Error('No Directory');
        
        rl.close();
        process.exit();
    }

    files = findit.sync(destDir);
    parse(files.shift());
    return;

    files.forEach(function(file) {
        destDir = path.dirname(file);
        destName = removeDate(path.basename(file, '.markdown'));

        if(!destName) {
            return;
        } 

        sourcePath = path.join(sourceDir, destName);

        startParse(file, sourcePath, destName, complete);
        return;
        // 디렉토리 생성
        mkdirp.sync(sourcePath);
        console.log('haroo> create directory at %s'.yellow, sourcePath);

        mkdirp.sync(sourcePath +'/@img');
        console.log('haroo> create image directory at %s'.yellow, sourcePath +'/@img');

        step(
            function copyPost() {
                // 파일복사 
                console.log('haroo> copy to %s.markdown file'.yellow, destName);
                exec('cp '+ file +' '+ sourcePath +'/index.markdown', this); 
            },
            function parsePost(err, stdout, stderr) {
                post = convert(sourcePath +'/index.markdown');

                console.log('haroo> jekyll convert to haroopress'.cyan);
                fs.writeFileSync(sourcePath +'/index.markdown', post, 'utf8');
            }
        );

        console.log('---------------------------------------------------------------');
    });

    console.log('completed total ', String(files.length).yellow, 'files');

    rl.close();
    process.exit();
});

