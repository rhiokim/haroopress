var conf = {
    meta: {
        version: '0.8.1',
        defaultTitle: 'haroopress',
        description: 'Static Page Blog engine based Node.js',
        siteUrl: 'http://haroopress.github.com',
        author: 'Rhio Kim',
        keywords: [ 'node.js', 'javascript', 'html5' ]
    },
    lang: 'en',
    contentLength: 6, //\n\n
    pagenate: 5,
    deployBranch: 'gh-pages',
    CNAME: '',

    sourceDir: __dirname + '/source/data',
    publicDir: __dirname + '/_public',
    deployDir: __dirname + '/_deploy',
    themeDir: __dirname + '/source/themes',

    /* theme setting */
    theme: {
        name: 'basic'
    },
    
    /* third party settings */
    plugins: {
        recents: {
            display: false,
            articleCount: 5,
            showNameTag: true
        },
        github: {
            display: false,
            user: '',
            repoCount: 10,       //if 0 is all else display count
            profileLink: true,
            skipForks: true
        },
        twitter: {
            display: false,
            user: '',
            tweetCount: 10,
            showReplies: false,
            followerButton: false,
            showFollowerCount: false,
            tweetButton: false 
        },
        google: {
            display: false,
            googleAnalyticsId: '',  //google analytics tracking id, default false
            googlePlus: false,
            googlePlusSize: 'medium',
            gplus: {
                display: false,
                user: ''
            }
        },
        disqus: {
            display: false,
            shortName: '',
            showCommentCount: true
        },
        facebook: {
            display: false, 
            user: '',
            showSiteLink: false,
            showLikeButton: false 
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
