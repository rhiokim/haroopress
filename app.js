var fs = require('fs'),
    moment = require('moment'),
    express = require('express'),
    haroo = require('./lib/haroopress/index'),
    config = require('./config'),
    routes = require('./source/routes'),
    path = require('path');

var theme = path.resolve(config.themeDir, config.theme.name );

var data = haroo.getMainData();
data.config.meta.pageTitle  = '';

var app = express.createServer();
app.configure(function() {
    app.set('views', theme +'/views');
    app.set('view engine', 'ejs');

    app.use(express.static(theme +'/public'));
   
    //app.use(express.logger());
    app.use(express.cookieParser());
    app.use(express.bodyParser());

    app.use(express.methodOverride());
    app.use(app.router);

    //app.use(pass.initialize());
    //app.use(pass.session());
});

app.get('/', function(req, res) {
    res.render('main', data);
});

app.get('/post/:title', function(req, res) {
    data.archive = data.archives[req.params.title];
	data.config.meta.pageTitle = data.archive.head.title +' | ';
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
	data.config.meta.pageTitle = data.author.head.name +'\'s articles | ';
    res.render('author', data);
});


app.get('/archives', function(req, res) {
    res.render('archives', data);
});


app.get('/slides', function(req, res) {
    res.render('slides', data);
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
