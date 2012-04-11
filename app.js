var mdb = require('markdown-blog'),
    fs = require('fs'),
    moment = require('moment'),
    express = require('express'),
    haroo = require('./lib/haroo'),
    config = require('./config'),
    routes = require('./source/routes');

/**
 * markdown blog configure
 */
mdb.setConfig('articles', config.articles);
mdb.setConfig('authors', config.authors);

var data = haroo.getMainData();

var app = express.createServer();
app.configure(function() {
    app.set('views', __dirname +'/source/views-new');
    app.set('view engine', 'ejs');
    
//    app.use(express.logger());
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.session({ secret: 'haroog' }));

    app.use(app.router);
    app.use(express.static(__dirname +'/source/public'));
});

app.get('/', function(req, res) {
    res.render('main', data);
});

app.get('/pages/:page', function(req, res) {
});

app.get('/post/:title', function(req, res) {
    data.archive = data.archives[req.params.title];
    res.render('archive', data);
});

/* category main page */
app.get('/category', function(req, res) {
    res.render('categories', data);
});

app.get('/category/:cate', function(req, res) {
    data.cates = data.categories[req.params.cate];
    res.render('cate', data);
});


/* category main page */
app.get('/authors', function(req, res) {
    res.render('authors', data);
});

app.get('/authors/:name', function(req, res) {
    data.author = data.authors[req.params.name];
    res.render('author', data);
});


app.get('/archives', function(req, res) {
    var posts = fs.readFileSync(__dirname +'/source/_index.json', 'utf8');
    posts = JSON.parse(posts);
    posts.forEach(function(post) {
        post.published = moment(new Date(post.published)).fromNow();
    });

    res.render('archives', { config: config, plugins: config.plugins, posts: posts });
});

app.get('/tags', function(req, res) {
    var tags = fs.readFileSync(__dirname +'/source/_tags.json', 'utf8');
    tags = JSON.parse(tags);

    res.render('tags', { config: config, plugins: config.plugins, tags: tags });
});

app.get('/tags/:tag', function(req, res) {
    var tags = fs.readFileSync(__dirname +'/source/_tags.json', 'utf8');
    tags = JSON.parse(tags);

    res.render('tag', { config: config, plugins: config.plugins, articles: tags[req.params.tag] });
});


app.listen(8000);
console.log('Start at http://localhost:8000');
