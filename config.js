module.exports = {
    "meta": {
        "version": "0.8.4",
        "defaultTitle": "하루프레스 > Haroopress Official Site",
        "description": "하루프레스는 하루를 손쉽게 기록해 보자라는 뜻의 블로그 엔진으로, Node.js 와 EJS 템플릿 엔진으로 설계된 Github 에서 제공하는 정적 페이지 서비스를 위한 블로그 엔진입니다.",
        "siteUrl": "http://haroopress.github.com",
        "author": "Rhio Kim",
        "keywords": [
            "node.js",
            "haroopress",
            "octopress",
            "wordpress",
            "git",
            "javascript",
            "css",
            "html",
            "blog"
        ]
    },
    "lang": "en",
    "contentLength": 5,
    "pagenate": 5,
    "deployBranch": "gh-pages",
    "CNAME": "",
    "sourceDir": __dirname +"/source/data",
    "themeDir": __dirname +"/source/themes",
    "publicDir": __dirname +"/_public",
    "deployDir": __dirname +"/_deploy",
    "theme": {
        "name": "basic"
    },
    "recents": {
        "display": true,
        "articleCount": 5,
        "showNameTag": true
    },
    "analytics": {
        "display": true,
        "googleAnalyticsId": "UA-31231507-1"
    },
    "plugins": {
        "github": {
            "display": true,
            "user": "haroopress",
            "repoCount": 10,
            "skipForks": true
        },
        "tweets": {
            "display": false,
            "user": "",
            "tweetCount": 10
        },
        "twitter": {
            "display": true,
            "user": "haroopress",
            "tweetButton": true
        },
        "facebook": {
            "display": true,
            "user": "",
            "showLikeButton": true
        },
        "google": {
            "display": true,
            "googlePlusSize": "medium"
        },
        "disqus": {
            "display": true,
            "shortName": "haroopress",
            "showCommentCount": true
        },
        "delicious": {},
        "contributors": {
            "display": true
        },
        "weather": {
            "display": true,
            "delay": 0,
            "zipcode": "KSXX0037"
        }
    }
}
