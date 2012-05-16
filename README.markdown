# haroopress 
>haroopress 는 FRENDS 내부 해카톤 행사 참여를 위한 프로젝트입니다.

haroopress 는 node.js 기반으로 작성된 static 블로그 엔진입니다.

문서 작성은 markdown 포맷만 지원하며 블로그 ui 는 twitter bootstrap 을 이용하였습니다.

# structure

haroopress 는 정적 페이지 렌더링을 기본 구조로 하고 있기 때문에 사용자가 작은 설정하나를 고치더라도 전체 구조에 영향을 미칠 수 있습니다. 그래서 이 소스를 이용해 블로그를 운영하거나 디자인을 수정하거나 할 경우 다음의 구조를 잘 이해하길 권장한다.

`source` 디렉토리 가장 중요한 디렉토리이다. 정적 페이지를 생성하기 위한 디자인 템플릿과 아티클을 포함한 정적 페이지를 생성하기 위한 리소스들이 모두 들어있습니다.

디자인을 변경하거나 블로그 레이아웃을 수정해야 하는 경우에는 이곳에 있는 소스를 수정하면 됩니다.

`deploy` 디렉토리는 `source` 디렉토리를 기준으로 정적 페이지가 생성되는 디렉토리로 보면됩니다. 물론 github.com 에 업로드될 때에는 이 폴더가 그대로 업로드 된다고 보면 됩니다.

`bin` 디렉토리는 정적 페이지를 생성하기 위한 node.js 기반 cli 명령 파일들이 있습니다.  이 부분은 수정하지 않기를 권장합니다.

`config.js` 파일은 파일명에서도 알 수 있듯이 블로그의 환경 설정을 위한 파일입니다.  이 파일은 `haroopress` 를 이용해 블로그를 생성하고자 할 때 꼭 수정하게 되어있는데 `config.js` 에 설명된 주석을 잘 읽어보고 수정하기를 권장합니다.

그외의 파일은 node.js 기반으로 로컬에서 운영하기 위한 파일이거나 개발에 필요한 소스들이니 수정하지 않기를 권장합니다.

# setup & install

```
//jquery, require.js 서브 모듈에서 아래의 유틸을 이용해 리소스 최적화를 진행하기 때문에 npm 을 이용해 모듈을 설치해 주어야 한다.
$ npm install uglify-js -g
$ npm install less -g
$ npm install locally -g

//내부 서브 모듈까지 모두 초기화한다.
$ git clone git@github.com:rhiokim/haroopress.git --recursive

//모듈 및 라이브러리 초기화, 리소스 설정
$ make init
```

# usage

```
//set deployment repository
$ make github-page

//new article
$ make new_post

//static page generating
$ make gen

//preview
$ make preview

//deploy
$ make deploy

//new page
$ make new-page
```

# plugins

* **google analysis**
* **disquss**
* github
* twitter timeline
* **social buttons**
    - twitter
    - google plus
    - facebook like

# Data Format
하루프레스에서는 사용자가 생성하는 모든 내용(포스팅, 페이지, 프로필 등)은 모두 `markdown` 으로 작성되고, 하루프레스는 오직 자바스크립트로만 구현이 되어 있어 엔진에서 사용되거나 생성하는 모든 데이터는 `json` 포맷으로 이루어져있습니다. 

그리고 일반적인 GUI 방식의 관리자 도구가 없기 때문에 하루프레스에서 다루는 매우 간단한 데이터 구조는 알아두면 좋습니다.
해당 내용은 아래의 링크에서 좀더 자세히 참고하실 수 있습니다.

[하루프레스 데이터 구조](https://github.com/rhiokim/haroopress/wiki/%EB%8D%B0%EC%9D%B4%ED%84%B0-%ED%8F%AC%EB%A7%B7)

# dependency 
* ejs
* mkdirp
* findit
* moment
* roboskirt
* rss
* step
* watch
* colors
* stringex
* yaml

# screenshot


# license
Copyright (c) 2012 Rhio Kim

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
