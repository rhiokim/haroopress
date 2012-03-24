{
    "title": "getUserMeida 를 이용한 사용자 디바이스 데이터 스트리밍",
    "author": "Rhio Kim",
    "date": "Mon Mar 19 2012 10:31:36 GMT+0900 (KST)",
    "categories": [
        "node.js"
    ],
    "tags": [
        "getUserMedia",
        "node.js",
        "javascript"
    ],
    "acceptComment": true,
    "acceptTrackback": true,
    "published": "Mon Mar 19 2012 10:31:36 GMT+0900 (KST)",
    "modified": "Mon Mar 19 2012 10:31:36 GMT+0900 (KST)",
    "status": "draft",
    "advanced": {}
}

# Audio Streaming using by User Device
강의를 나가면 늘 강의장의 환경이 다르다.  핀 마이크가 있거나 없거나 스피커가 있거나 없거나 그래서 고민했던 것중에 하나가 스마트폰이 있으면 스마트폰에 마이크를 장착하고 강연을 하면 강의장의 환경에 구애받지 않고 언제든지 동일한 환경에서 강의를 할 수 있겠구나 생각을 했습니다.

물론 수백명이 오는 강의장에서는 어렵겠지만...

그래서 출발한 아이디어는 엔드 유저의 디바이스에 오디오 스트림을 브로드 캐스팅을 하거나 프리젠테이션을 하는 노트북으로 전송할 수만 있다면 손쉽겠구나 하는 아이디어가 떠올랐습니다.

하지만 대부분의 디바이스는 그걸 허락하지 않았고 native 에서 ap

# References
* http://francisshanahan.com/index.php/2011/stream-a-webcam-using-javascript-nodejs-android-opera-mobile-web-sockets-and-html5/
* http://dev.w3.org/2011/webrtc/editor/getusermedia.html
