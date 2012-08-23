var fs = require('fs'),
    path = require('path'),
    mkdirp = require('mkdirp'),
    RSS = require('rss'),
    colors = require('colors'),
    haroo = require('./index'),
    renderer = require('./renderer'),
    conf = require('../../config'),
    exec = require('child_process').exec;

var theme = path.resolve(conf.themeDir, conf.theme.name );
renderer.setViewDir(theme +'/views');

function cloneResources(next) {
    var sorc = path.resolve(conf.themeDir, conf.theme.name, 'public') +'/*';
    var dest = path.resolve(conf.publicDir);
    var cmmd = 'cp -R '+ sorc +' '+ dest;

    console.log('haroo> %s'.yellow, cmmd);

    exec(cmmd, function(code, stdout, stderr) {
        next();
    });
}

function log(message) {
    console.log(message);
}

function write(output, res, charset) {
    fs.writeFileSync(output, res, charset || 'utf8');
    log("haroo> ".yellow + output);
}

function rss() {
    var data = haroo.getMainData();
    var dates = data.dates;
    var archives = data.archives;
    var res, id, archive, author, arvatar, file, output;

    var feed = new RSS({
        title: conf.meta.defaultTitle,
        description: conf.meta.description,
        feed_url: conf.meta.siteUrl +'/rss.xml',
        site_url: conf.meta.siteUrl,
        image_url: conf.meta.siteUrl +'/public/img/favorite.png'
    });

    log('haroo> export rss.xml ¶'.yellow);

    var article, limit = conf.pagenate < dates.serialize.length ? conf.pagenate : dates.serialize.length;
    for(id = 0; id < limit; id++) {
        archive = dates.serialize[id];

        author = archive.author.head;
        arvatar = '<img src="'+ archive.author._gravatar.replace('128.jpg','48.jpg') +'"><br/>';
        author = '<a href="'+ author.twitter +'" target="_blank">'+ author.name +'</a>';

        feed.item({
            title: archive.head.title,
            description: arvatar + archive.cuthtml,
            url: conf.meta.siteUrl +'/post/'+ archive._file,
            author: author,
            guid: archive._file,
            date: archive.head.published
        });
    }

    write(conf.publicDir +'/rss.xml', feed.xml());
}

function page404() {
    var res, data = haroo.getMainData();

    data.config.meta.pageTitle = '404 page not found | ';

    log('haroo> export 404.html ¶'.yellow);

    res = renderer.http('404', data);
    write(conf.publicDir +'/404.html', res);
}

function index() {
    var res, data = haroo.getMainData();

    data.config.meta.pageTitle = '';

    log('haroo> export index.html ¶'.yellow);

    res = renderer.render('main', data);
    write(conf.publicDir +'/index.html', res);
}

function archives() {
    var res, data = haroo.getMainData();

    log('haroo> export archives.html ¶'.yellow);

    data.config.meta.pageTitle = 'Blog Archives | ';

    mkdirp.sync(conf.publicDir +'/archives', 0755);

    res = renderer.render('archives', data);
    write(conf.publicDir +'/archives/index.html', res);
}

function archive() {
    var data = haroo.getMainData();
    //var archives = data.archives;
    var archives = data.dates.serialize;
    var res, id, archive, file, resources, output;

    log('haroo> export article.html ¶'.yellow);

    for(id = 0; id < archives.length; id++) {
    //for(id in archives) {
        archive = archives[id];
        file = archive._file;

         //문서 상태가 draft 인 경우는 퍼블리싱 하지 않는다.
        if(archive.head.status != 'public') {
            continue;
        }

        output = path.resolve(conf.publicDir, 'post', file);
        resources = path.resolve(conf.sourceDir, 'articles', file, '@img');

        mkdirp.sync(output, 0755);
        exec('cp -R '+ resources +' '+ output +'/@img');

        data.archive = archive;
        data.config.meta.pageTitle = archive.head.title +' | ';

        res = renderer.render('archive', data);
        write(output +'/index.html', res);
    }
}

function slide() {
    var data = haroo.getMainData();
    var slides = data.slides;
    var res, id, slide, file, resources, output, layout;

    log('haroo> export slides ¶'.yellow);


    for(id in slides) {
        slide = slides[id];
        file = slide._file;

         //문서 상태가 draft 인 경우는 퍼블리싱 하지 않는다.
        if(slide.head.status != 'public') {
            continue;
        }

        output = path.resolve(conf.publicDir, 'slides', file);
        resources = path.resolve(conf.sourceDir, 'slides', file, '@img');

        mkdirp.sync(output, 0755);
        exec('cp -R '+ resources +' '+ output +'/@img');

        data.slide = slide;
        data.config.meta.pageTitle = slide.head.title +' | ';

        layout = slide.head.advanced.layout || 'slide';
        res = renderer.slide(layout +'/main', data);
        write(output +'/index.html', res);
    }
}


function slides() {
    var res, data = haroo.getMainData();

    log('haroo> export slides.html ¶'.yellow);

    data.config.meta.pageTitle = 'Slides | ';

    mkdirp.sync(conf.publicDir +'/slides', 0755);

    res = renderer.render('slide/list', data);
    write(conf.publicDir +'/slides/index.html', res);
}

function categories() {
    var data = haroo.getMainData();
    var categories = data.categories;
    var res, id, cate, archive, file, output;

    data.config.meta.pageTitle = '';

    log('haroo> export categories.html ¶'.yellow);

    output = path.resolve(conf.publicDir, 'category');

    mkdirp.sync(output, 0755);
    res = renderer.render('categories', data);

    write(output +'/index.html', res);
}

function cate() {
    var data = haroo.getMainData();
    var categories = data.categories;
    var res, id, cate, archive, file, output;

    log('haroo> export category.html ¶'.yellow);

    for(id in categories) {
        cate = categories[id];
        output = path.resolve(conf.publicDir, 'category', id);

        mkdirp.sync(output, 0755);
        data.cates = cate;
        data.config.meta.pageTitle = 'Kinds of '+ id +' | ';

        res = renderer.render('cate', data);
        write(output +'/index.html', res);
    }
}

function authors() {
    var data = haroo.getMainData();
    var authors = data.authors;
    var res, id, author, archive, file, output;

    data.config.meta.pageTitle = '';

    log('haroo> export authors.html ¶'.yellow);

    output = path.resolve(conf.publicDir, 'authors');
    mkdirp.sync(output, 0755);

    res = renderer.render('authors', data);
    write(output +'/index.html', res);
}

function author() {
    var data = haroo.getMainData();
    var authors = data.authors;
    var res, id, author, archive, file, output;

    log('haroo> export author.html ¶'.yellow);

    for(id in authors) {
        author = authors[id];
        output = path.resolve(conf.publicDir, 'authors', id);

        mkdirp.sync(output, 0755);
        data.author = author;
        data.config.meta.pageTitle = author.head.name +'\'s articles | ';

        res = renderer.render('author', data);
        write(output +'/index.html', res);
    }
}


function pages() {
    var data = haroo.getMainData();
    var pages = data.pages;
    var res, id, page, file, output, layout, resources, display, status;

    log('haroo> export pages.html ¶'.yellow);

    for(id in pages) {
        page = pages[id];

        status = page.head.status;

        //문서 상태가 draft 인 경우는 퍼블리싱 하지 않는다.
        if(status != 'public') {
            continue;
        }

        layout = page.head.advanced.layout || 'pages';
        display = page.head.advanced.display || 'top';

        output = page._dir.replace( conf.sourceDir, conf.publicDir );
        output = output.replace('/pages', '');
        resources = path.resolve(page._dir, '@img');

        mkdirp.sync(output, 0755);
        exec('cp -R '+ resources +' '+ output +'/@img');

        data.page = page;
        data.config.meta.pageTitle = page.head.title;

        res = renderer.page(layout +'/main', data);
        write(output +'/index.html', res);
    }
}

module.exports = {
    clone: cloneResources,
    rss: rss,
    page404: page404,
    index: index,
    archives: archives,
    archive: archive,
    categories: categories,
    cate: cate,
    authors: authors,
    author: author,
    pages: pages,
    slide: slide,
    slides: slides
};
