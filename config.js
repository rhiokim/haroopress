var conf = {
    meta: {
        version: '0.7.0',
        defaultTitle: 'haroopress',
        description: 'Static Page Blog engine based Node.js',
        siteUrl: 'http://haroog.dev:8000',
        author: 'Rhio Kim',
		keywords: [ 'node.js', 'javascript', 'html5' ]
    },
    lang: 'en',
    articles: process.cwd() +'/source/articles',
    authors: process.cwd() +'/source/authors',

    rss: {
        contentLength: 0
    },
    
    sourceDir: __dirname + '/source',
    deployDir: __dirname + '/_deploy',

    deployBranch: 'gh-pages',
    CNAME: 'nodejs.kr'
};


/* third party settings */
conf.plugins = {
    github: {
        user: 'rhiokim',
        repoCount: 0,
        profileLink: true,
        skipForks: true
    },
    twitter: {
        user: 'rhiokim',
        tweetCount: 4,
        showReplies: false,
        followerButton: true,
        showFollowerCount: false,
        tweetButton: true
    },
    google: {
		googleAnalyticsId: 'UA-30492002-1',  //google analytics tracking id, default false
		googlePlus: true,
		googlePlusSize: 'medium'
    },
    disqus: {
        shortName: 'nodekr',
        showCommentCount: false
    },
    facebook: {
        showLikeButton: true 
    },
    delicious: {},
    contributors: {
        display: true
    }
};

module.exports = conf;
