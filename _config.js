var conf = {
    meta: {
        version: '0.2.1',
        defaultTitle: 'Markdown Blog - HarooGul',
        description: 'Markdown Blogging engine based Node.js',
        siteUrl: 'http://haroog.dev:8000',
        author: ''   //your name
    },
    articles: process.cwd() +'/source/articles',
    authors: process.cwd() +'/source/authors',

    rss: {
        contentLength: 0
    },
    
    sourceDir: __dirname + '/source',
    deployDir: __dirname + '/_deploy',

    deployBranch: 'gh-pages',
    CNAME: '' //your CNAME
};


/* third party settings */
conf.plugins = {
    github: {
        user: "", //your github.com account
        repoCount: 0,
        profileLink: true,
        skipForks: true
    },
    twitter: {
        user: "", //your twitter account
        tweetCount: 4,
        showReplies: false,
        followerButton: true,
        showFollowerCount: false,
        tweetButton: true
    },
    google: {},
    disqus: {
        shortName: "", //your disqus id
        showCommentCount: false
    },
    facebook: {
        showLikeButton: true 
    },
    delicious: {}
};

module.exports = conf;
