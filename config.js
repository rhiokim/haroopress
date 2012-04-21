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
    publicDir: __dirname + '/_public',
    deployDir: __dirname + '/_deploy',
    themeDir: __dirname + '/source/themes',

    deployBranch: 'gh-pages',
    CNAME: 'nodejs.kr'
};

conf.theme = {
    name: 'basic'
};

/* third party settings */
conf.plugins = {
    github: {
        display: true,
        user: 'rhiokim',
        repoCount: 10,       //if 0 is all else display count
        profileLink: true,
        skipForks: true
    },
    twitter: {
        display: true,
        user: 'rhiokim',
        tweetCount: 10,
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
        display: true,
        shortName: 'nodekr',
        showCommentCount: true
    },
    facebook: {
        showLikeButton: true 
    },
    delicious: {},
    contributors: {
        display: true
    },
    weather: {
        display: true,
        delay: 8000,
        zipcode: 'KSXX0037'
    }
};

module.exports = conf;
