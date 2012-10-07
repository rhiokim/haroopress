# V8U[tilities]<br/><small>Sugar for your Node C++ addons</small>

Have you ever written a C/C++ addon for Node.JS?  
If you have, you probably are tired of writing so much
code for just having the skeleton of it.  
Sure, the V8 syntax is very **verbose** and repetitive.

With V8U, that will change.

## Enough talking, show me code!

Here we have a simple module which exposes _one_ class `Hello`, with _one_ method, `world`.  
It takes _one_ string as argument, and just returns it untouched.

```C++
class Hello : public ObjectWrap {
public:
  //The constructor
  static Handle<Value> NewInstance(const Arguments& args) {
    if (!args.IsConstructCall())
      return ThrowException(Exception::Error(String::New("Not called as constructor!")));
    Hello* instance = new Hello;
    instance->Wrap(args.This());
    return args.This();
  }

  //The world() method
  static Handle<Value> World(const Arguments& args) {
    if (args.Length() < 1)
      return ThrowException(Exception::RangeError(String::New("Not enough arguments!")));
    if (!args[0]->IsString())
      return ThrowException(Exception::TypeError(String::New("Arg must be a string!")));
    return scope.Close(args[0]);
  }
};

extern "C" {
  static void initHello(Handle<Object> target) {
    Local<FunctionTemplate> protL = FunctionTemplate::New(Hello::NewInstance);
    Persistent<FunctionTemplate> prot = Persistent<FunctionTemplate>::New(protL);
    prot->InstanceTemplate()->SetInternalFieldCount(1);
    prot->SetClassName(String::NewSymbol("Hello"));
    NODE_SET_PROTOTYPE_METHOD(prot, "world", Hello::World);
    target->Set(String::NewSymbol("Hello"), prot->GetFunction();
  }
  NODE_MODULE(simpleaddon, initHello);
};
```

With V8U, things start to look better:

```C++
class Hello : public ObjectWrap {
public:
  V8_CL_CTOR(Hello, 0) {
    inst = new Hello;
  } V8_CL_CTOR_END()

  V8_CL_CALLBACK(Hello, World, 1) {
    if (!args[0]->IsString())
      V8_THROW(TypeErr("Arg must be a string!"));
    return scope.Close(args[0]);
  } V8_WRAP_END()
};

NODE_DEF_TYPE(Hello, "Hello") {
  NODE_DEF_METHOD(Hello, World, "world");
} NODE_DEF_TYPE_END()

NODE_DEF_MAIN() {
  initHello(target);
} NODE_DEF_MAIN_END(simpleaddon)
```

And that's just scratching the surface of what V8U provides.  
What's more, V8U cares about exception wrapping, persistent handles, and other
things for you!

## How to use

To use V8U, simply copy the HPP file into your project.  
Then include it:

```C++
#include "v8u.hpp"
using namespace v8u;
```

Now, let the fun begin!

TODO: explain syntax and macros  
For now, you can [look at Robotskirt](https://github.com/benmills/robotskirt/blob/unstable/src/robotskirt.cc#L512) to see
a usage example.
