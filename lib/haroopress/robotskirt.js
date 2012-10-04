var rs = require('robotskirt'),
	hljs = require('highlight.js');
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

var parser = new rs.Markdown(renderer, [
		rs.EXT_AUTOLINK,
		rs.EXT_FENCED_CODE,
		rs.EXT_LAX_SPACING,
		rs.EXT_STRIKETHROUGH, 
		rs.EXT_SUPERSCRIPT,
		rs.EXT_TABLES, 
		rs.EXT_STRIKETHROUGH
	]);
// var parser = rs.Markdown.std([
// 		rs.EXT_AUTOLINK,
// 		rs.EXT_FENCED_CODE,
// 		rs.EXT_LAX_SPACING,
// 		rs.EXT_STRIKETHROUGH, 
// 		rs.EXT_SUPERSCRIPT,
// 		rs.EXT_TABLES, 
// 		rs.EXT_STRIKETHROUGH
// 	], [
// 		rs.HTML_TOC
// 		]);


module.exports = parser;

