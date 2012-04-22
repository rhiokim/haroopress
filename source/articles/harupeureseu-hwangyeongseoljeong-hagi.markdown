{
    "title": "하루프레스 환경설정 하기",
    "author": "Rhio Kim",
    "date": "2012-04-21T04:50:23.435Z",
    "categories": [
        "haroopress",
        "tutorial"
    ],
    "tags": [
        "haroopress",
        "tutorial"
    ],
    "acceptComment": true,
    "acceptTrackback": true,
    "published": "2012-04-21T04:50:23.435Z",
    "status": "draft",
    "important": true,
    "advanced": {}
}

## config.js 
먼저 하루프레스의 환경설정 파일인 config.js 는 굉장히 중요합니다.

### config.js 구성
환경설정 파일을 열어보면 다음과 같은 JSON 포맷의 내용을 볼 수 있습니다.

```js
var conf = {
    meta: {}
};

conf.theme = {
};

conf.plugins = {
};

module.exports = conf;
```

위의 JSON 의 구성을 하나하나 살펴보겠습니다.

먼저 굳이 설명할 필요 없는  `conf` 는 모든 환경설정을 담는 객체 변수입니다. 

```js
var conf = {
}
```

다음은 기본 사이트 구성정보를 담고 있는 `meta: {}` 는 메타정보를 담고 있습니다.
모든 페이지에서 적용되기 때문에 하루프레스를 초기화 시 필수적으로 설정해야할 정보입니다.

```js
var conf = {
    meta: {}
}
```

다음 테마 정보입니다.
하루프레스에서 제공하는 테마는 현재 딱 두가지입니다. `basic`와 `wood` 입니다. 
원하는 테마명을 지정해주면 됩니다. 테마는 `source/theme` 디렉토리에 있는 폴더명과 매칭됩니다. 

```js
conf.theme = {
    name: 'basic'
};
```

다음은 하루프레스를 더 멋지게 사용하기 위한 다양한 플러그인을 관리하는 설정값들입니다.
만약 `github` 저장소 목록 플러그인을 사용하고 싶다면 `conf.plugins.github` 의 설정값들을 조절해주면 됩니다.

```js
conf.plugins = {
    github: {}
};
```

간단히 `config.js` 의 구성에 대해서 알아보았습니다. 이 파일을 하루프레스가 동작하기 위한 필수 설정 파일이기 때문에
설정 값들에 대해서 명확히 이해한 후에 값들을 설정하기를 권장드립니다.

## 자세히 알아보는 설정 값

```js
var conf = {
    meta: {
        version: '0.8.0',
        defaultTitle: 'haroopress',
        description: 'Static Page Blog engine based Node.js',
        siteUrl: 'http://haroopress.github.com',
        author: 'Rhio Kim',
        keywords: [ 'node.js', 'javascript', 'html5'javascript ]
    },
    articles: process.cwd() +'/source/articles',
    authors: process.cwd() +'/source/authors',

    sourceDir: __dirname + '/source',
    publicDir: __dirname + '/_public',
    deployDir: __dirname + '/_deploy',
    themeDir: __dirname + '/source/themes',

    lang: 'en',
    contentLength: 6,
    deployBranch: 'gh-pages',
    CNAME: ''
};

conf.theme = {
    name: 'basic'
};

conf.plugins = {
    github: {
        display: false,
        user: '[your github.com account]',
        repoCount: 0,       //if 0 is all else display count
        profileLink: true,
        skipForks: true
    },
    twitter: {
        display: false,
        user: '[your twitter account',
        tweetCount: 10,
        showReplies: false,
        followerButton: true,
        showFollowerCount: false,
        tweetButton: true
    },
    google: {
        display: false,
        googleAnalyticsId: '[your tracking id eg. UA-123445678-2]',  //google analytics tracking id, default false
        googlePlus: true,
        googlePlusSize: 'medium',
        gplus: {
            display: false,
            user: '[your google plus account'
        }
    },
    disqus: {
        display: false,
        shortName: '[disqus short name]',
        showCommentCount: true
    },
    facebook: {
        display: false,
        user: '[your facebook account]',
        showSiteLink: true,
        showLikeButton: true
    },
    delicious: {},
    contributors: {
        display: true
    },
    weather: {
        display: false,
        delay: 0,
        zipcode: '[your zipcode eg. KSXX0037]'
    }
};

module.exports = conf;
```
