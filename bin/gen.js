#!/usr/bin/env node

var colors = require('colors'),
    gen = require('../lib/haroopress/generator');

function showContentStatus() {
    var count = gen.data.count;

    console.log('=====================================');
    console.log('==       content statistics        ==');
    console.log('=====================================');
    console.log('== article | publish(%s) | draft(%s) ==', String(count.archive.publish).red, String(count.archive.draft).red);
    console.log('== page    | publish(%s) | draft(%s) ==', String(count.page.publish).red, String(count.page.draft).red);
    console.log('== slide   | publish(%s) | draft(%s) ==', String(count.slide.publish).red, String(count.slide.draft).red);
    console.log('=====================================');
}

gen.clone(function() {
    gen.rss();
    gen.page404();
    gen.index();
    gen.archives();
    gen.archive();
    gen.slide();
    gen.slides();
    gen.categories();
    gen.cate();
    gen.authors();
    gen.author();
    gen.pages();

    showContentStatus();
});
