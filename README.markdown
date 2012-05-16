# 하루프레스(haroopress) 
하루프레스는 간단하게 말하면 **하루**의 기록을 남기기 위한 블로그입니다. 한글의 **하루**와 블로그 엔진으로 유명한 워드 프레스의 **프레스**의 단어가 합쳐진 합성어입니다.

기술적으로는 루비의 jekyll 기반의 정적 페이지 블로그 엔진인 [Octopress](http://octopress.org)와 유사한 블로그 엔진으로 노드(node.js)를 기반으로 개발되어진 정적 페이지 블로그 엔진이다.


# 설치와 셋업

```
//내부 서브 모듈까지 모두 초기화한다.
$ git clone git@github.com:rhiokim/haroopress.git --recursive /path/to/haroopress

//하루프레스 디렉토리로 이동한다.
$ cd /path/to/haroopress

//모듈 및 라이브러리 초기화, 리소스 설정
$ make init

... 

```

# 사용법(usage)

```
//배포할 github 저장소를 설정한다.
$ make github-page

//새로운 기사를 작성한다.
$ make new_post

//정적 페이지를 생성한다.
$ make gen

//생성된 페이지를 배포전 미리본다.
$ make preview

//배포
$ make deploy

//새로운 페이지를 생성한다.
$ make new-page
```

# 플러그인(plugins)

* **google analysis**
* **disquss**
* github
* twitter timeline
* **social buttons**
    - twitter
    - google plus
    - facebook like

# 데이터 구조(data structure) 
하루프레스에서는 사용자가 생성하는 모든 내용(포스팅, 페이지, 프로필 등)은 모두 `markdown` 으로 작성되고, 하루프레스는 오직 자바스크립트로만 구현이 되어 있어 엔진에서 사용되거나 생성하는 모든 데이터는 `json` 포맷으로 이루어져있습니다. 

그리고 일반적인 GUI 방식의 관리자 도구가 없기 때문에 하루프레스에서 다루는 매우 간단한 데이터 구조는 알아두면 좋습니다.
해당 내용은 아래의 링크에서 좀더 자세히 참고하실 수 있습니다.

[하루프레스 데이터 구조](https://github.com/rhiokim/haroopress/wiki/%EB%8D%B0%EC%9D%B4%ED%84%B0-%ED%8F%AC%EB%A7%B7)

# 데이터 변환(convertor)
하루프레스는 데이터 변환기를 유틸로 제공하여 다양한 블로그의 데이터를 하루프레스로 손쉽게 이전할 수 있습니다.
현재는 변환 유틸의 구조를 설계하기 위해 [Octopress](http://octopress.org) 만을 제공하고 있으며 향후 Wordpress, Tumblr, Tistory, Blogger 등의 유명한 블로그 엔진의 데이터를 위한 변환 유틸도 구현할 계획에 있습니다.

## 변환도구 사용법(usage)

```
$ make octopress

Please! insert octopress article directory : `[/path/to/octopress/source/_post]`

haroo> create directory at /path/to/haroopress/source/data/articles/[article-title]
haroo> create image directory at /path/to/haroopress/source/data/articles/[article-title]/@img
haroo> copy to [article-title].markdown file
haroo> jekyll convert to haroopress
----------------------------------------------------------------
```

# 의존성 모듈(dependency modules)
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

# 화면(screenshot)


# 라이센스(license)
Copyright (c) 2012 Rhio Kim

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
