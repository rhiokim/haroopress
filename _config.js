/**
 * Please! Do not modify.
 * It's default file for haroopress configuration
 */
var conf = {
    meta: {
        version: '0.8.7',
        defaultTitle: 'haroopress',
        description: 'Static Page Blog engine based Node.js, haroopress, 하루프레스',
        siteUrl: 'http://haroopress.com',
        author: 'haroopress',
        email: 'rhio.kim+haroopress@gmail.com',
        keywords: [ 'haroopress', 'blog' ]
    },
    lang: 'en',
    contentLength: 5, //\n\n
    pagenate: 5,
    dateFormate: 'mm:ssa, Do MMM YYYY',
    deployBranch: 'gh-pages',
    CNAME: '',

    sourceDir: __dirname + '/source/data',
    themeDir: __dirname + '/source/themes',
    publicDir: __dirname + '/_public',
    deployDir: __dirname + '/_deploy',
    defaultPort: 8081,
    defaultSlideStyle: 'basic',
    defaultCodeStyle: 'default',

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
            display: true,
            sort: 'DESC',
            count: 5
        },
        weather: {
            display: false,
            delay: 0,
            zipcode: 'KSXX0037'
        }
    }
};

module.exports = conf;
