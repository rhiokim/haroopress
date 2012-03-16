var log = require('../lib/logging').from(__filename);

// to run: nodeunit test

module.exports = {
    'test test': function(test) {
        test.ok(true, 'true is true');
        test.done();
    },

    'test log': function(test) {
        log('test');
        test.ok(true, 'true is true');
        test.done();
    },

    'log multiple inputs': function(test) {
        log('hello', 'world', 1, 2, 'three');
        test.ok(true, 'true is true');
        test.done();
    },

    'log array': function(test) {
        log('array', [1, 2, 3, 'four', 'five', 'six']);
        test.ok(true, 'true is true');
        test.done();
    },

    'log object': function(test) {
        log('object', { a: 'apple', b: 'bear', c: ['cookies', 'cake', 'calculators', { abc: 123,  def: 'jhi', klm: true, pqr: false }]});
        test.ok(true, 'true is true');
        test.done();
    },

    'function name': function function_name(test) {
        log('function name');
        test.done();

    },


    'arguments': function SUPERARGTEST(test) {
        function YYYY (aaaa) {
            log('arguments', arguments);
            //log(caller);
            //log(callee);
            log(arguments.callee.caller.name);
            //log(arguments.caller.name);
            log(arguments.callee.name);

        }

        function ZZZZ() {
            YYYY('i am an argument');
        }

        ZZZZ();
        test.done();
    },
    
    'foreach': function  (test) {
        //'use strict';  strict mode is not supported
        ['a', 'b', 'c'].forEach(function(val){
            log(val);
        });
        test.done();

    },

    'async': function (test) {
        function A() {
            log('i have a name');
            test.done();
        }

        setTimeout(function(){
            A();
        }, 100);
    },

    'async inline': function (test) {

        setTimeout(function(){
           log('i have no name');
            test.done();
        }, 100);
    }

};