#!/usr/bin/env node

var exec = require('child_process').exec,
    fs = require('fs'),
    path = require('path'),
    mkdirp = require('mkdirp');
    readline = require('readline'),
    findit = require('findit'),
    colors = require('colors'),
    yaml = require('yaml'),
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

    for(prop in source) {
        switch(prop) {
            case 'date':
                model[prop] = new Date(source[prop]);
                model.published = model[prop];
                break;
            case 'layout':
                model.advanced[prop] = source[prop];
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

function convert(file) {
    var raw, header, body, post;

    raw = fs.readFileSync(file, 'utf8');
    raw = raw.split('---');

    header = parseHead(raw[1]);
    post = header + '\n\n';
    post += raw[2];

    return post;
}

rl = readline.createInterface(process.stdin, process.stdout, null);
rl.question('Please! insert octopress article directory : ', function(destDir) {

    //TODO exception 
    if(!path.existsSync(destDir)) {
        throw new Error('No Directory');
        
        rl.close();
        process.exit();
    }

    var sourcePath, destDir, destName;

    files = findit.sync(destDir);

    console.log('processing total %s files', files.length);

    files.forEach(function(file) {
        destDir = path.dirname(file);
        destName = removeDate(path.basename(file, '.markdown'));

        if(!destName) {
            return;
        } 

        sourcePath = path.join(sourceDir, destName);

        if(path.existsSync(sourcePath)) {
            
        }

        // 디렉토리 생성
        mkdirp.sync(sourcePath);
        console.log('haroo> create directory at %s'.yellow, sourcePath);
        // 파일 이동
        exec('cp -R '+ file +' '+ sourcePath +'/index.markdown');
        console.log('haroo> copy to %s.markdown file'.yellow, destName);
        // 이미지 디렉토리 생성
        mkdirp.sync(sourcePath +'/@img');
        console.log('haroo> create image directory at %s'.yellow, sourcePath +'/@img');
        console.log('---------------------------------------------------------------');

        convert(sourcePath +'/index.markdown');
    });

    console.log('completed total ', String(files.length).yellow, 'files');

    rl.close();
    process.exit();
});

