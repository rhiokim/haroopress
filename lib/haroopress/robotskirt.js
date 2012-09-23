var rs = require('robotskirt');
var renderer = new rs.HtmlRenderer([
		rs.HTML_TOC
		]);

var parser = rs.Markdown.std([
		rs.EXT_AUTOLINK,
		rs.EXT_FENCED_CODE,
		rs.EXT_LAX_SPACING,
		rs.EXT_STRIKETHROUGH, 
		rs.EXT_SUPERSCRIPT,
		rs.EXT_TABLES, 
		rs.EXT_STRIKETHROUGH
	], [
		rs.HTML_TOC
		]);

module.exports = parser;

