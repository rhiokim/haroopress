var fs = require('fs'),
    conf = require('../config'),
    path = require('path'),
    crypto = require('crypto'),
    direc = require('direc'),
    findit = require('findit'),
    moment = require('moment'),
    md = require('robotskirt');

//setting language set of haroopress
moment.lang(conf.lang || 'en');

function Haroo() {
    var archiveFiles = direc.sort(conf.sourceDir +'/articles', 'mtime'),
        authorFiles = direc.sort(conf.sourceDir +'/authors'),
        pageFiles = findit.sync(conf.sourceDir +'/pages'),
        authors = {},
        archives = {},
        categories = {},
        dates = {},
        pages = {},
        tags = {},
        favorites = {}; 

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
    function datelize(archive) {
        var date = archive.head.published;
        var dt = moment(date).format('YYYY-MM-DD').split('-');
        var y = dt[0], m = dt[1], d = dt[2];

        if(!dates.hasOwnProperty(y)) {
            dates[y] = {};
        }

        if(!dates[y].hasOwnProperty(m)) {
            dates[y][m] = {};
        }

        if(!dates[y][m].hasOwnProperty(d)) {
            dates[y][m][d] = [];
        }

        dates[y][m][d].push(archive);
//        dates.index.push(dt.join('-'));
//        dates[y].push(archive);
//        dates[dt.join('-')] = archive;

//        dates = { index: ['2011-04', '2012-04'], data : { '2011' : {}}}
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
        file = file[file.length - 1].replace('.markdown', '');

        return file;
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
    
    function initialize() {
        var file, author;
        authorFiles.forEach(function(item) {
            file = item._file;
            author = loadAuthor(file);
            author._gravatar = getGravatar(author.head.email);
            author.body = md.toHtmlSync(author.body);
            author.archives = [];
            authors[author.head.name] = author;
        });

        var archive, id, arr=[];
        archiveFiles.forEach(function(item, idx) {
            id = getFileName(item._file);

            archive = archives[id] = loadArticle(item._file);
            archive.html = md.toHtmlSync(archive.body);
            //TODO: short cut html for index page
            archive.head.published = getDateFormat(archive.head.published);

            archive._file = id;
            archive.author = authors[archive.head.author];

            //serialize for prev & next article link
            arr.push(archive);
            if(arr[idx-1]) {
                arr[idx-1].next = archive;
                arr[idx].prev = arr[idx-1];
            }

            categorize(archive, archive.head.categories);
            tagize(file, archive.head.tags);
            authorize(archive, archive.head.author);
            datelize(archive);
        });

          function sortHash(o) {
               var a = [],i;
               for(i in o){
                 if(o.hasOwnProperty(i)){
                     a.push([i,o[i]]);
                 }
               }
               a.sort(function(a,b){ return a[0]<b[0]?1:-1; })
               return a;
            }
        function sortObject(o) {
            var sorted = {},
            key, a = [];

            for (key in o) {
                if (o.hasOwnProperty(key)) {
                        a.push(key);
                }
            }

            a.sort();

            for (key = 0; key < a.length; key++) {
                sorted[a[key]] = o[a[key]];
            }
            return sorted;
        }

        for(var y in dates) {
            for(var m in dates[y]) {
                for(var d in dates[y][m]) {
                    dates[y][m] = sortHash
                }
            }
            dates[p] = sortHash(dates[p]);
        }

        dates.index = sortHash(dates);
//        sortHash(dates);
//        console.log(sortHash(dates));
        /* date indexing */
//        console.log(JSON.stringify(dates));
//        dates.index.sort(function(a, b){ return new Date(a).getTime() - new Date(b).getTime(); });
//        dates.index.reverse(true);

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
                page.html = md.toHtmlSync(page.body);
              
                dir = item.split('/');
                file = dir.pop();
                page._dir = dir.join('/');

                page._path = item.replace(conf.sourceDir +'/pages', '');

                page._path = item.replace(conf.sourceDir +'/pages', '');
                page._path = page._path.replace('.markdown', '.html');
                page._path = page._path.replace('index.html', '');

                page.toc = getTOC(page.body);
                pages[page._path] = page;

            }
        });

        loadFavorite();        
    }

    initialize();
    
    return {
        getMainData: function() {
            return {
                archives: archives,
                categories: categories,
                authors: authors,
                pages: pages,
                dates: dates,
                favorites: favorites,
                config: conf
            }
        },
        /**
         * @return Array
         */
        getArchives: function() {
            return archives;
        },

        getArchiveHeader: function(id) {
            return archives[id].head;
        },

        getArchiveMarkdown: function(id) {
            return archives[id].body;
        },

        getArchiveBody: function(id) {
            return md.toHtmlSync(archives[id].body);
        },

        getArchiveCutBody: function(id, cut) {
            var archive = archives[id].body.split('\n\n');
            cut = cut || 5;
            archive = archive.slice(0, cut);
            archive = archive.join('\n\n');

            return md.toHtmlSync(archive);
        },

        getAuthorIntro: function(id) {
            return md.toHtmlSync(authors[id].body);
        }
    };
};

module.exports = new Haroo();
