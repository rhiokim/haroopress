var fs = require('fs'),
	robotskirt = require('../robotskirt');

fs.readFile('mds/sample.markdown', 'utf8', function(err, data) {
	var res = robotskirt.render(data);
	console.log(res)
});
