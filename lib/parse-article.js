/**
 * 포스팅 파일 데이터 모델러
 */

var fs = require('fs'),
    md = require('robotskirt'),
    moment = require('moment');

function tokenize(text) {
    var tokens = text.split('\n\n'),
        head = JSON.parse(tokens.shift()),
        body = tokens.join('\n\n');

    return {
        head: head,
        body: body
    };
}

function date(str) {
    return moment(str).format('LLLL');
}

function getUID(file) {
    file = file.split('/');
    file = file[file.length - 2];

    return file;
}

function getHtml(markdown) {
    return markdown.length < 5 ? '' : md.toHtmlSync(markdown);
}

function getShortHtml(markdown, cutSize) {
    var cutStr = markdown.split('\n\n').slice(0, cutSize).join('\n\n');
    return getHtml(cutStr);
}

function parse(file, cutSize) {
    var raw = fs.readFileSync(file, 'utf8');
        raw = tokenize(raw);

    raw.uid = getUID(file);
    raw.head.date = date(raw.head.date);
    raw.head.published = date(raw.head.published);

    raw.html = getHtml(raw.body);
    raw.shortHtml = getShortHtml(raw.body, cutSize);

    return raw;
}

module.exports.parse = parse;
