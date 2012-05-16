#!/usr/bin/env node

var gen = require('../lib/generator');

gen.clone(function() {
    gen.rss();
    gen.page404();
    gen.index();
    gen.archives();
    gen.archive();
    gen.categories();
    gen.cate();
    gen.authors();
    gen.author();
    gen.pages();
});
