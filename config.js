var conf = {
    meta: {
        version: '0.0.1',
        defaultTitle: 'Markdown Blog'
    },
    articles: process.cwd() +'/source/articles',
    authors: process.cwd() +'/source/authors'
};

/* third party settings */
conf.appconf = {
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
    facebook: {},
    delicious: {}
};

module.exports = conf;