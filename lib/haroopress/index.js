var fs = require('fs'),
    conf = require('../../config.js'),
    path = require('path'),
    crypto = require('crypto'),
    findit = require('findit'),
    moment = require('moment'),
    md = require('marked'),
    hljs = require('highlight.js'),
    slideParse = require('./slide');

//setting language set of haroopress
moment.lang(conf.lang || 'en');

//setting marked
md.setOptions({
  gfm: true,
  pedantic: false,
  sanitize: true,
  // callback for code highlighter
  highlight: function(code, lang) {
    var res;

    try {
        res = hljs.highlight(lang, code).value;
    } catch(e) {

    } finally {
        return hljs.highlightAuto(code).value;
    }
    return res;
  }
});

function findMarkdown(dir) {
    var mds = [], files = findit.sync(conf.sourceDir +'/'+ dir);

    files.forEach(function(file) {
        if( file.indexOf('index.markdown') <= -1) {
            return;
        }

        mds.push(file);
    });

    return mds;
}

function Haroo() {
//    var archiveFiles = direc.sort(conf.sourceDir +'/articles', 'mtime'),
    var archiveFiles = findMarkdown('articles'),
        authorFiles = findit.sync(conf.sourceDir +'/authors'),
        pageFiles = findit.sync(conf.sourceDir +'/pages'),
        slideFiles = findMarkdown('slides'),
        authors = {},
        authorsOrder = [],
        archives = {},
        archivesOrder = [],
        categories = {},
        pages = {},
        slides = {},
        slidesOrder = [],
        tags = {},
        favorites = {},
        count = {};

    function tokenizer(str) {
        var token = str.split('\n\n'),
            head = JSON.parse(token.shift()),
            body = token.join('\n\n');

        return {
            head: head,
            body: body
        }
    }

    function categorize(archive, cates) {
        cates.forEach(function(cate) {
            cate = cate.toLowerCase();
            if(!categories.hasOwnProperty(cate)) {
                categories[cate] = [];
                categories[cate].push(archive);
            } else {
                categories[cate].push(archive);
            }
        });
    }

    function authorize(archive, author) {
        authors[author].archives.push(archive);
    }


    /**
     * @desc 날짜를 기준으로 인덱싱
     */
    function datelize(source, target) {
        var date = source.head.published;
        var dt = moment(date).format('YYYY-MM-DD').split('-');
        var y = dt[0], m = dt[1], d = dt[2];

        if(!target.hasOwnProperty(y)) {
            target[y] = {};
        }

        if(!target[y].hasOwnProperty(m)) {
            target[y][m] = {};
        }

        if(!target[y][m].hasOwnProperty(d)) {
            target[y][m][d] = [];
        }

        target[y][m][d].push(source);
    }

    function tagize(archive, taglist) {
        taglist.forEach(function(tag) {
            if(!tags.hasOwnProperty(tag)) {
                tags[tag] = [];
                tags[tag].push(archive);
            } else {
                tags[tag].push(archive);
            }
        });
    }
    
    /**
     * @desc gravatar image url
     * @return String
     */
    function getGravatar(email, size) {
        var size = size || '128',
            md5 = crypto.createHash('md5');
            md5.update(email);

        return "http://www.gravatar.com/avatar/"+ md5.digest('hex') +"?r=pg&s="+ size +".jpg&d=identicon";
    }

    /**
     * @desc load archive & 
     * @param String file
     * @return Object
     */
    function loadArticle(file) {
        var text = fs.readFileSync(file, 'utf8');

        return tokenizer(text);
    }

    /**
     * @desc load pages
     * 
     */
     function loadPage(file) {
         var text = fs.readFileSync(file, 'utf8');

         return tokenizer(text);
     }

    /**
     * @desc load author
     * @param String file
     * @return Object
     */
    function loadAuthor(file) {
        var text = fs.readFileSync(file, 'utf8');

        return tokenizer(text);
    }

    function loadFavorite() {
        var links = fs.readFileSync(conf.sourceDir +'/favorites.markdown', 'utf8');
        var token;

        favorites.list = [];
        links = links.split('\n');

        links.forEach(function(link) {
            if(link) {
                token = {};

                link = link.match( /^\[([\s\S]*?)\][ \t]*\([ \t]*(\S+)(?:[ \t]+(["'])(.*?)\3)?[ \t]*\)/ );
                token.name = link[1];
                token.url = link[2];

                favorites.list.push(token);
            }
        });
    }

    /**
     * @desc date notation
     * @param String time string
     * @retrun string
     */
    function getDateFormat(str) {
        return moment(str).format('LLLL');
    }

    function getFileName(file) {
        file = file.split('/');
        file = file[file.length - 2];

        return file;
    }

    /**
     * @desc sort by publish date
     * @return {Object} sorted data
     */
    function sortList(source) {
        var p, i = 0, tmp = [];

        for(p in source) {
            tmp.push(source[p]);
        }

        tmp.sort(function(a, b) {
            var atime = new Date(a.head.published).getTime();
            var btime = new Date(b.head.published).getTime();
            return atime - btime;
        });

        return tmp.reverse();
    }

    /* hash sort */
    function sortHash(o) {
        var a = [],i;
        for(i in o){
            if(o.hasOwnProperty(i)){
                a.push([i,o[i]]);
            }
        }
        a.sort(function(a,b){ return a[0]<b[0]?1:-1; });
        return a;
    }

    function getTOC(text) {
        var tokens = text.split('\n');
        var i, m, len = tokens.length, line, level;
        var toc = {};

        for(i = 0; i < len; i++) {
            line = tokens[i];
            m = line.match( /^(#{1,6})\s*(.*?)\s*#*\s*(?:\n|$)/ );

            //header 가 아닌 경우
            if ( !m ) {
                continue;
            }
            
            level = m[1].length;

            //toc 에 level 속성이 없는 경우
            if (!toc.hasOwnProperty(level)) {
               toc[level] = []; 
            }

            toc[level].push(line.replace(/#/g, '').trim());
        }

        return toc;
    }

    function removeImage(text) {
        var m = text.match(/^!\[(.*?)\][ \t]*\([ \t]*(\S*)(?:[ \t]+(["'])(.*?)\3)?[ \t]*\)/);
    }

    function counting() {
        var prop, item, cnt, status; 
        count = {
            archive: {
                draft: 0,
                publish: 0
            },
            page: {
                draft: 0,
                publish: 0
            },
            slide: {
                draft: 0,
                publish: 0
            }
        };

        for(prop in archives) {
            status = archives[prop].head.status;
            cnt = count.archive;
            if(!cnt.hasOwnProperty(status)) {
                cnt[status] = 0;
            }

            cnt[status]++;
        }


        for(prop in pages) {
            status = pages[prop].head.status;
            cnt = count.page;
            if(!cnt.hasOwnProperty(status)) {
                cnt[status] = 0;
            }

            cnt[status]++;
        }

        for(prop in slides) {
            status = slides[prop].head.status;
            cnt = count.slide;
            if(!cnt.hasOwnProperty(status)) {
                cnt[status] = 0;
            }

            cnt[status]++;
        }
    }
    
    function initialize() {
        var file, author;
        authorFiles.forEach(function(file) {
            author = loadAuthor(file);
            author._gravatar = getGravatar(author.head.email);
            author.body = md.parse(author.body);
            author.archives = [];
            authors[author.head.name] = author;
        });

        var archive, id, idx = 0, arr = [];
        archiveFiles.forEach(function(file) {
            id = getFileName(file);

            archive = archives[id] = loadArticle(file);
            /** only publish status article */
            if(archive.head.status != 'publish') {
                delete archives[id];
                return;
            }

            /** slide style **/
            var tempBody = archive.body,
                sliceBody = tempBody.split('\n\n').slice(0, conf.contentLength).join('\n\n');

            archive.html = tempBody.length < 5 ? '' : md.parse(tempBody);
            archive.cuthtml =  tempBody.length < 5 ? '' : md.parse(sliceBody);

            archive.cuthtml = archive.cuthtml.replace(/.\/@img\//g, '/post/'+id+'/@img/');

            //TODO: short cut html for index page
            archive._printDate = moment(archive.head.published).format(conf.dateFormat);
            archive.head.published = getDateFormat(archive.head.published);

            archive._file = id;
            archive.author = authors[archive.head.author];

            //serialize for prev & next article link
            arr.push(archive);
            if(arr[idx-1]) {
                arr[idx-1].next = archive;
                arr[idx].prev = arr[idx-1];
            }
            idx++;

            categorize(archive, archive.head.categories);
            tagize(file, archive.head.tags);
            authorize(archive, archive.head.author);
            datelize(archive, archivesOrder);
        });

        /* Contributors sort */
        var name, res = [];

        for(name in authors) {
            res.push(authors[name]);
        }
        authorsOrder = res.sort(function(a, b) {
            return a.archives.length - b.archives.length;
        });

        if(conf.plugins.contributors.sort == 'ASC') {
            authorsOrder.reverse();
        }

        /* Hash data sort DESC date */
        for(var y in archivesOrder) {
            for(var m in archivesOrder[y]) {
                archivesOrder[y][m] = sortHash(archivesOrder[y][m]);
            }
            archivesOrder[y] = sortHash(archivesOrder[y]);
        }
        archivesOrder.index = sortHash(archivesOrder);
        archivesOrder.serialize = sortList(archives);

        var page, stat, dir, file;
        pageFiles.forEach(function(item) {
            //유효한 파일이 아닌 경우
            if(item.indexOf('.swp') != -1) {
                return;    
            }

            stat = fs.statSync(item);

            if (stat.isFile() && item.indexOf('.markdown') >= 0) {
                page = loadPage(item);
                page._file = item;
                page.html = md.parse(page.body);
              
                dir = item.split('/');
                file = dir.pop();
                page._dir = dir.join('/');

                page._path = item.replace(conf.sourceDir +'/pages', '');

                page._path = item.replace(conf.sourceDir +'/pages', '');
                page._path = page._path.replace('.markdown', '.html');
                page._path = page._path.replace('index.html', '');

                page.toc = getTOC(page.body);

                page.author = authors[page.head.author];
                pages[page._path] = page;

            }
        });

        /* slide style */
        var slide;
        slideFiles.forEach(function(file) {
            id = getFileName(file);

            slide = slides[id] = loadArticle(file);

            /** only publish status article */
            if(slide.head.status != 'publish') {
                delete slide[id];
                return;
            }

            /** slide style **/
            var tempBody = slide.body,
                sliceBody = tempBody.split('-----').slice(0, conf.contentLength).join('-----');

            slide.html = tempBody.length < 5 ? '' : slideParse(tempBody, slide.head.advanced.displayCover);
            slide.cuthtml =  tempBody.length < 5 ? '' : slideParse(sliceBody);

            slide.cuthtml = slide.cuthtml.replace(/.\/@img\//g, '/post/'+id+'/@img/');

            //TODO: short cut html for index page
            slide._printDate = moment(slide.head.published).format(conf.dateFormat);
            slide.head.published = getDateFormat(slide.head.published);

            slide._file = id;
            slide.author = authors[slide.head.author];


            datelize(slide, slidesOrder);
        });


        /* Hash data sort DESC date */
        for(var y in slidesOrder) {
            for(var m in slidesOrder[y]) {
                slidesOrder[y][m] = sortHash(slidesOrder[y][m]);
            }
            slidesOrder[y] = sortHash(slidesOrder[y]);
        }
        slidesOrder.index = sortHash(slidesOrder);
        slidesOrder.serialize = sortList(slides);

        loadFavorite();

        counting();
    }

    initialize();
    
    return {
        getMainData: function() {
            return {
                archives: archives,
                categories: categories,
                authors: authors,
                authorsOrder: authorsOrder,
                pages: pages,
                slides: slides,
                slidesOrder: slidesOrder,
                dates: archivesOrder,
                favorites: favorites,
                config: conf,
                count: count
            }
        }
    };
};

module.exports = new Haroo();
