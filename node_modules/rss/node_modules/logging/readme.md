
# Logging  [![Build Status](https://secure.travis-ci.org/dylang/logging.png)](http://travis-ci.org/dylang/logging)

  Super sexy color console logging with cluster support.


## Install

     npm install logging


## Usage

      var log = require('logging').from(__filename);

      log('hello world');

      log('counter', 123);

      log('global variables', global);

      log(1, "2", [ 3, 4 ], { 5: 6 }, function() { return 7; });


## Features

  * Color
  * Timestamp
  * Filename
  * Function Name
  * Inspects arrays, objects, functions - all in color.
  * Stores history
  * Fast
  * Easy

## Todo
  * Timezone, 24/12-hour options.
  * Wire up the tests.
  * More colors/effects.
  * warn/error.

## Contributors

  * Dylan Greene [dylang](http://github.com/dylang)

## External Dependencies

  * Node

## License

(The MIT License)

Copyright (c) 2009-2010 Dylan Greene &lt;dylang@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.