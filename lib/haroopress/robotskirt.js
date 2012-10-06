var rs = require('robotskirt'),
	hljs = require('highlight.js'),
	plugins = require('./plugins');

var renderer = new rs.HtmlRenderer([
		rs.HTML_TOC
		]);

renderer.blockcode = function(code, lang) {
    var res;

    lang = (lang) ? lang : '';
    try {
        res = hljs.highlight(lang, code).value;
    } catch(e) {

    } finally {
        return '<pre><code class="'+ lang +'">'+ hljs.highlightAuto(code).value +'</code></pre>';
    }
    return '<pre><code class="'+ lang +'">'+ res +'</code></pre>';
}

renderer.paragraph = function(text) {
	var res, plugin;
	var token = text.match(/^ *\[([^\:\]]+):([^\]]+)\] *\n*/);

	if(!token) { return '<p>'+text+'</p>' }

	plugin = plugins[token[1]];
	if(plugin) {
		res = plugin.apply(null, token[2].split(' '));
		return '<p>'+res+'</p>';
	}
}

var parser = new rs.Markdown(renderer, [
		rs.EXT_TABLES, 
		rs.EXT_FENCED_CODE,
		rs.EXT_AUTOLINK,
		rs.EXT_LAX_SPACING,
		rs.EXT_STRIKETHROUGH, 
		rs.EXT_SUPERSCRIPT,
		rs.EXT_STRIKETHROUGH
	]);


module.exports = parser;

