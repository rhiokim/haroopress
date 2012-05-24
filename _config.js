var conf = {
    meta: {
        version: '0.8.4',
        defaultTitle: 'haroopress',
        description: 'Static Page Blog engine based Node.js',
        siteUrl: 'http://haroopress.github.com',
        author: 'Rhio Kim',
        keywords: [ 'node.js', 'javascript', 'html5' ]
    },
    lang: 'en',
    contentLength: 3, //\n\n
    pagenate: 5,
    deployBranch: 'gh-pages',
    CNAME: '',

    sourceDir: __dirname + '/source/data',
    themeDir: __dirname + '/source/themes',
    publicDir: __dirname + '/_public',
    deployDir: __dirname + '/_deploy',

    /* theme setting */
    theme: {
        name: 'basic'
    },

    recents: {
        display: true,
        articleCount: 5,
        showNameTag: true
    },

    /* google analytics */
    analytics: {
        display: false,
        googleAnalyticsId: ''
    },
    
    /* third party settings */
    plugins: {
        github: {
            display: false,
            user: '',
            repoCount: 10,       //if 0 is all else display count
            skipForks: true
        },
        tweets: {
            display: false,
            user: '',
            tweetCount: 10
        },
        twitter: {
            display: false,
            user: '',
            tweetButton: false
        },
        facebook: {
            display: false,
            user: '',
            showLikeButton: false
        },
        google: {
            display: false,
            googlePlusSize: 'medium'
        },
        disqus: {
            display: false,
            shortName: '',
            showCommentCount: true
        },
        delicious: {},
        contributors: {
            display: true
        },
        weather: {
            display: false,
            delay: 0,
            zipcode: 'KSXX0037'
        }
    }
};

module.exports = conf;
