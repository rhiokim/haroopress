var mdb = require('markdown-blog'),
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

app.get('/post/:title', function(req, res) {
    var post = mdb.loadArticle(req.params.title);

    res.render('main', { meta: config, header: post.header, author: post.author, body: post.article });
});

app.listen(8000);
