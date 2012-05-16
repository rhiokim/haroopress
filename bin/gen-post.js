var conf = require('../config'),
    path = require('path'),
    exec = require('child_process').exec,
    Post = require('../lib/parse-article'),
    Author = require('../lib/parse-author');

function getAuthorFile(id) {
    return path.join(conf.sourceDir, 'authors') + '/'+ id +'.markdown';
}

function genPost(file) {
    var output, resources, 
        post = Post.parse(file, conf.contentLength),
        author = Author.parse(getAuthorFile(post.head.author));
    
    output = path.resolve(conf.publicDir, 'post', post.uid);
    resources = path.resolve(conf.sourceDir, 'articles', post.uid, '@img'); 

    console.log(output, resources);

    mkdirp.sync(output, 0755);
    exec('cp -R '+ resources +' '+ output +'/@img');
}

module.exports = {
    generate: genPost
};
