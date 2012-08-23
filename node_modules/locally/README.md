#intro
locally 는 웹 개발 시 로컬 서버를 손쉽게 생성해서 테스트 개발환경을 구축하기 위한 Node.js 기반의 미들웨어이다.  이 프로젝트는 Python 의 SimpleHTTPServer 에서 아이디어를 얻었다.

언제, 어느 작업 디렉토리에 있던 내가 원하는 로컬 서버를 설정하기 위해서 사용된다.

뿐만 아니라 최근의 웹 기술중 서버측 css인 less 를 지원한다. 그리고 향후 유용한 서버측 환경설정 프리셋을 제공하여 손쉽게 마크업 개발 환경을 만들 예정이다.

#locally middleware
locally 는 connect 모듈을 기반으로 동작하는데 connect 모듈은 다양한 미들웨어를 추가해서 high class 기능등을 사용할 수 있다.  뿐만 아니라 손쉽게 로컬 웹 서버를 구축해서 마크업 환경을 설정할 수 있다.

#usage
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


**basic command**

```
//simple command
$ locally -p 8080

//full command
$ locally --static ./static --public ./public -port 8080

$ curl http://localhost:8080/
$ curl http://localhost:8080/about
```

**python**

```python
$ python -m SimpleHTTPServer -p 8080
```

**help cli**

```
$ node lib/locally.js --help

  Usage: locally.js [options] [command]

  Commands:

    init 
    locally setup webserver configuration

  Options:

    -h, --help                output usage information
    -V, --version             output the version number
    -s, --static <directory>  directory for serving static files
    -d, --public <directory>  directory for serving public files
```

