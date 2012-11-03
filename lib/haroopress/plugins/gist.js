var https = require('https');

function getScriptUrl(gist_id, filename) {
	return 'https://gist.github.com/'+ gist_id +'.js?file='+filename;
}

function getGistUrl(gist_id, filename) {
	return 'https://gist.github.com/raw/'+ gist_id +'/'+ filename;
}

function htmlOutput(script_url, code) {
	return '<script src='+ script_url +'></script><noscript><pre><code>#{code}</code></pre></noscript>'
}

module.exports = function(gist_id, file) {
	var scriptUrl = getScriptUrl(gist_id, file);
	
	return htmlOutput(scriptUrl);
};

