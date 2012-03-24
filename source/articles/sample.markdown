{
    "title": "Markdown Blog",
    "author": "Rhio Kim",
    "date": "Fri Dec 02 2011 00:31:36 GMT+0900 (KST)",
    "categories": [
    	"markdown"
    ],
    "tags": [
        "태그1",
        "태그2",
        "태그3"
    ],
    "acceptComment": true,
    "acceptTrackback": true,
    "published": "Fri Dec 02 2011 00:31:36 GMT+0900 (KST)",
    "modified": "Fri Dec 02 2011 00:32:36 GMT+0900 (KST)",
    "status": "draft",
    "advanced": {}
}

# Intro
locally 는 웹 개발 시 로컬 서버를 손쉽게 생성해서 테스트 개발환경을 구축하기 위한 Node.js 기반의 미들웨어이다.  이 프로젝트는 Python 의 SimpleHTTPServer 에서 아이디어를 얻었다.

언제, 어느 작업 디렉토리에 있던 내가 원하는 로컬 서버를 설정하기 위해서 사용된다.

>뿐만 아니라 최근의 웹 기술중 서버측 css인 less 를 지원한다. 그리고 향후 유용한 서버측 환경설정 프리셋을 제공하여 손쉽게 마크업 개발 환경을 만들 예정이다. <small>&lt;보류&gt;</small>

locally 는 connect 모듈을 기반으로 동작하는데 connect 모듈은 다양한 미들웨어를 추가해서 high class 기능등을 사용할 수 있다.  뿐만 아니라 손쉽게 로컬 웹 서버를 구축해서 마크업 환경을 설정할 수 있다.

# Install
Require NPM(Node Package Manager)

```
curl http://npmjs.org/install.sh | sh
```

NPM module install to global

```
$ npm install -g locally
```


# Dependencies
locally 는 connect 모듈을 통해 웹 서버가 구동되고 cli 모듈은 commander.js 모듈을 이용하였다. 두가지 모듈 모두 visionmedia 의 TJ 가 개발한 node.js 모듈이다.

# How to use

**directory structure**

```
./
+ static
  - js
  - img
  - css
+ public
  - index.html
  + routes
    - about/index.html
```

**python**

```python
$ python -m SimpleHTTPServer -p 8080
```


**basic command**

```bash
//simple command
$ locally -p 8080

//full command
$ locally --public ./public -port 8080

//short cut command
$ locally -w ./public -p 8080

//debug mode
$ locally --debug

$ curl http://localhost:8080/
$ curl http://localhost:8080/about
```

**help cli**

```bash
$ locally --help

Usage: _locally [options]

  Options:

    -h, --help                  output usage information
    -V, --version               output the version number
    -s, --static <directory>    directory for serving static files
    -w, --public <directory>    directory for serving public files
    -d, --debug                 debug mode
    -p, --port <port>           public port
    -f, --file <configuration>  set configuration file
    -n, --vhost <virtual host>  set vhost information

 Examples:

    $ locally -w ./public -p 8080  start basic locally server
    $ locally -d                   debug mode, default <false>
    $ locally -f ./conf/.locally   force adjust locally configuration file
```

## options

`locally` 는 기본적으로 실행 위치를 기준으로 `.locally` 파일로 미리 정의된 환경 옵션 셋을 지원한다.

>만약 이 파일이 없다면 `locally --help` 를 통해 cli 옵션을 활용할 수 있다.


```
$ cd /path/to/my_web_project
$ pwd
/path/to/my_web_project

$ cat .locally
-w ./src/main
-p 8081
--debug

$ locally
document root :  /path/to/my_web_project/./src/main
debug mode : true
Serving started at http://localhost:8081
```

# Roadmap
* Virtual Host 환경 지원
* fs.watcher 를 이용한 on the fly 기능
* markdown preview 기능 지원

# License

(The MIT License)

Copyright (c) 2011 Rhio Kim <rhio.kim@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
