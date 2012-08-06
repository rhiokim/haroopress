var slide = require('../slide');
var fs = require('fs');

fs.readFile('slide/test.md', 'utf8', function(err, data) {
    var res = slide(data);

    console.log(res);
});
