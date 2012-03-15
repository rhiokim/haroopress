var mdb = require('markdown-blog'),
    direc = require('direc'),
    fs = require('fs'),
    moment = require('moment'),
    express = require('express'),
    config = require('./config'),
    routes = require('./source/routes');

/**
 * markdown blog configure
 */
mdb.setConfig('articles', config.articles);
mdb.setConfig('authors', config.authors);

var app = express.createServer();
app.configure(function() {
    app.set('views', __dirname +'/source/views');
    app.set('view engine', 'ejs');
    
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.session({ secret: 'haroog' }));

    app.use(app.router);
    app.use(express.static(__dirname +'/source/public'));
});

app.get('/', function(req, res) {
    var posts = fs.readFileSync(__dirname +'/source/_index.json', 'utf8');
    posts = JSON.parse(posts);
    posts.forEach(function(post) {
        post.header.published = moment(new Date(post.header.published)).fromNow();
    });

    res.render('main', { meta: config.meta, posts : posts });
});

app.get('/post/:title', function(req, res) {
    var post = mdb.loadArticle(req.params.title);

    res.render('article', { meta: config, header: post.header, author: post.author, body: post.article });
});

app.listen(8000);
console.log('Start at http://localhost:8000');
