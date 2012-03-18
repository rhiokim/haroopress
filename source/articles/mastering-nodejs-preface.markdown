{
    "title": "Mastering Node.js book - Preface",
    "author": "fallroot",
    "date": "Fri Dec 02 2012 00:31:36 GMT+0900 (KST)",
    "categories": [
    	"javascript",
    	"node.js"
    ],
    "tags": [
    ],
    "acceptComment": true,
    "acceptTrackback": true,
    "published": "Fri Dec 02 2012 00:31:36 GMT+0900 (KST)",
    "modified": "Fri Dec 02 2012 00:32:36 GMT+0900 (KST)",
    "status": "draft",
    "advanced": {}
}

**이 기사는 [Dmitry A. Soshnikov](http://dmitrysoshnikov.com/)에 의해 작성된 [Chapter 1. Execution Context](http://dmitrysoshnikov.com/ecmascript/chapter-1-execution-contexts/) 에 대한 내용을 허가를 받아 번역하였습니다.**

# 소개
이 장에서는 ECMAScript 의 실행 컨텍스트와 연관된 실행 코드의 종류에 대해 설명합니다.

# 정의
컨트롤이 ECMAScript 실행 코드로 이동하면 컨트롤은 항상 실행 컨텍스트로 전환합니다.
(역주: 브라우저에서 웹 페이지가 로드될 때의 일련의 과정중 자바스크립트 수행되는 시점)

> 실행 컨텍스트 (이하 EC) 는 ECMA-262 의 사양에서 실행 코드를 특징별로 분류하고 구분하는데 사용되는 추상적인 개념입니다 .

사양은 기술적인 구현 관점에서 EC 의 종류와 구조를 정확하게 정의하는 하고 있지는 않습니다.  자세한 내용은 이 사양을 구현하는 ECMAScript 엔진에 맡겨지고 있습니다.
(역주: 그렇기 때문에 자바스크립트 엔진에 따라 속도가 다르거나 간혹 브라우저에 따라 다르게 동작하는 경우도 발생합니다.)

논리적으로 활성화된 실행 컨텍스트의 집합은 스택을 형성합니다.  스택의 가장 아래는 항상 글로벌 즉 최상위 컨텍스트이며, 현재의 (활성화된) 실행 컨텍스트가 되어 있습니다.  이 스택은 다양한 종류의 EC 에 진입할 때 변경 (push/pop) 되어갑니다.

# 실행 코드의 종류
실행 컨텍스트는 추상적인 개념으로 각각의 실행 코드의 종류에 맞게 지원하고 있습니다.  즉 코드의 종류(글로벌 코드, 함수코드, eval 코드)에 대해서 말할때 그것을 해당 실행 컨텍스트를 의미하고 있다고 말할 수 있습니다.

코드의 종류(역주: 코드 종류를 이해하기 위해 코드를 추가함)

```js
<script>
   globalCode
   
   function foo(){
      functionCode
      eval(evalCode);
   }

   eval(evalCode);
</script>
```

예를 들어 실행 컨텍스트의 스택을 배열로 정의하여 봅시다.

```js
ECStack = [] ;
```

스택은 함수 (예: 재귀적으로 함수가 호출되거나 생성자로 호출되는 것)에 들어갈 때나 빌트 인의 eval 함수에 들어갈 때 반드시 이 스택에 새로운 요소로 push 된다고 할 수 있습니다.

## 전역 코드
전역 코드는 "Program" 이라는 수준으로 처리합니다.  즉 로드된 외부 .js 파일이나 로컬 인라인 코드 (&lt;script&gt; &lt;/script&gt; 태그의) 입니다.  글로벌 코드는 함수의 본문에 해당하는 코드는 포함하지 않습니다.

초기화 시 (프로그램 시작 시)에는 EC 스택은 다음과 같이 되어있는 것입니다.

```js
ECStack = [
   globalContext
];
```

## 함수 코드
함수 코드에 들어갈 때 (모든 종류의 함수) EC 스택에 새로운 요소가 push 됩니다.  그때 대상(역주:호출된) 함수의 코드가 내부 함수의 코드를 결코 포함하지 않는 다는 것에 주의하십시오.  예를 들어, 자기를 재귀적으로 한 번만 호출하는 함수를 봅시다.

```js
(function foo (bar) { 
    if (bar) { 
       return ;
    } 
    foo( true );
})();
```

이때 EC 스택은 다음과 같이 변경되어 있습니다.

```js
//처음에 foo 라는 함수 컨텍스트를 활성화합니다.
ECStack = [
   <foo> functionContext 
   globalContext
];
           
//재귀적으로 다시 foo 함수 컨텍스트를 활성화합니다.
ECStack = [
   <foo> functionContext - 재귀적
   <foo> functionContext
   globalContext
] ;
```

return 시 마다 현재의 실행 컨텍스트가 종료되고 이에 따라 EC 스택도 pop 됩니다.  일반적으로 스택의 구현방식처럼  연속해서 위에서 아래로 향하는 것으로 보면 됩니다.  throw 된 것을 catch 하지 않은 예외는 하나 또는 여러 실행 컨텍스트를 종료합니다.  이 코드의 동작이 완료되면 EC 스택에 글로벌 컨텍스트만 남을 때까지 반복합니다.  달리 말하면 프로그램의 끝까지 반복을 한다는 것입니다.

##eval 코드
eval 코드는 좀더 흥미로운 것들이 많습니다.  이 경우 *호출 컨텍스트* 컨셉이고 eval 함수가 호출되어 실행되는 별도의 컨텍스트가 활성화됩니다.  eval 에 의해 실행된 작업 (예를 들어 변수 및 함수 정의 등)은 호출자의 컨텍스트에 영향을 주게 됩니다.

```js
eval('var x = 10' );
 
(function foo() { 
   eval( 'var y = 20' );
})();
    
alert(x); // 10 
alert(y); // "y"가 정의되지 않았습니다.
```

EC 스택의 변화 모습입니다.

```js
ECStack = [
   globalContext
];
         
//eval ( 'var x = 10');
ECStack.push (
   evalContext
   callingContext : globalContext 
);
              
//eval이 컨텍스트를 종료합니다.
ECStack.pop ();
               
//foo 함수 호출
ECStack.push (<foo> functionContext);
               
//eval ( 'var y = 20');
ECStack.push (
   evalContext
   callContext : <foo> functionContext
);
                     
//eval에서 돌아갑니다.
ECStack.pop ();
                      
//foo에서 돌아갑니다.
ECStack.pop ();
```

매우 일반적이고 논리적인 스택입니다.

SpiderMonkey 1.7 버젼까지는 ( Firefox 와 Thunderbird 에서 도입) 호출 컨텍스트를 eval 함수의 두번째 인수로 전달할 수도록 구현되었습니다.  따라서 그 컨텍스트가 존재 하는 한, "private"(라고도 부를 수 있다) 변수로 적용되도록 할 수 있습니다.

```js
function foo() { 
   var x = 1;
   return function() {  alert (x); } ;
};
             
var bar = foo();
              
bar(); // 1
               
eval('x = 2' , bar); //문맥을 건네 내부 변수 "x" 에 적용합니다.
                
bar(); //2
```

# 결론
이 짧은 이론은 향후 각 장에서 다루는 실행 컨텍스트에 관련된 다양한 정보 (예를 들어 변수 객체와 범위 체인 등)을 이해하기 위해서 꼭 필요합니다.

# 참고 문헌
ECMA-262 3rd 사양에서 실행 컨텍스트를 다루는 장 - [10. Execution Contexts](http://bclary.com/2004/11/07/#a-10)

영어 버전 번역 : Dmitry A. Soshnikov 
영어 버전 공개 시간 : 2010-03-11

원래 러시아어 버전 저자 : Dmitry A. Soshnikov \[러시아어, [read >>](http://dmitrysoshnikov.com/ecmascript/ru-chapter-1-execution-contexts/)\] 
원래 러시아어 버전 공개 시간 : 2009-06-26