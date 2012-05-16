var fs = require('fs'),
    crypto = require('crypto'),
    path = require('path'),
    md = require('robotskirt');

function tokenize(text) {
    var tokens = text.split('\n\n'),
        head = JSON.parse(tokens.shift()),
        body = tokens.join('\n\n');

    return {
        head: head,
        body: body
    };
}

function getGravatar(email, size) {
    var size = size || '128',
        md5 = crypto.createHash('md5');
        md5.update(email);

    return "http://www.gravatar.com/avatar/"+ md5.digest('hex') +"?r=pg&s="+ size +".jpg&d=identicon";
}

function getHtml(markdown) {
    return md.toHtmlSync(markdown || '');
}

function parse(file) {
    var raw = fs.readFileSync(file, 'utf8');
        raw = tokenize(raw);

    raw._gravatar = getGravatar(raw.head.email);
    raw.html = getHtml(raw.body);

    return raw;
}

module.exports.parse = parse;
