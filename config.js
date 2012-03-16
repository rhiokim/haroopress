var conf = {
    meta: {
        version: '0.0.1',
        defaultTitle: 'Markdown Blog',
        description: 'Markdown Blogging engine based Node.js',
        siteUrl: 'http://haroog.dev:8000',
        author: 'Rhio Kim'
    },
    articles: process.cwd() +'/source/articles',
    authors: process.cwd() +'/source/authors',

    rss: {
        contentLength: 0
    },
    
    sourceDir: __dirname + '/source',
    deployDir: __dirname + '/_deploy'
};


/* third party settings */
conf.plugins = {
    github: {
        user: "rhiokim",
        repoCount: 0,
        profileLink: true,
        skipForks: true
    },
    twitter: {
        user: "rhiokim",
        tweetCount: 4,
        showReplies: false,
        followerButton: true,
        showFollowerCount: false,
        tweetButton: true
    },
    google: {},
    disqus: {
        shortName: "haroo",
        showCommentCount: false
    },
    facebook: {
        showLikeButton: true
    },
    delicious: {}
};

module.exports = conf;
