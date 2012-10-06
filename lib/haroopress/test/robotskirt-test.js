var fs = require('fs'),
	robotskirt = require('../robotskirt');

fs.readFile('mds/sample.markdown', 'utf8', function(err, data) {
	robotskirt.render(data);
});
