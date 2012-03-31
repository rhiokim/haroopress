var conf = {
    meta: {
        version: '0.2.1',
        defaultTitle: 'Markdown Blog - HarooGul',
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
    deployDir: __dirname + '/_deploy',

    deployBranch: 'gh-pages',
    CNAME: 'nodejs.kr'
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
        tweetButton: false
    },
    google: {
	googleAnalyticsId: 'UA-30492002-1',  //google analytics tracking id, default false
	googlePlus: false,
	googlePlusSize: 'medium'
    },
    disqus: {
        shortName: "nodekr",
        showCommentCount: false
    },
    facebook: {
        showLikeButton: true 
    },
    delicious: {}
};

module.exports = conf;
