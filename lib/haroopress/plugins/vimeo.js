
var _width = '500',
	_height = '281',
	_color = 'c9ff23',
	_auto = '0',
	_loop = '0',
	_portrait = '0',
	_title = '0',
	_byline = '0';

module.exports = function(key, width, height, color, auto, loop, portrait, title, byline) {
	width = width || _width;
	height = height || _height;
	color = color || _color;
	auto = auto || _auto;
	loop = loop || _loop;

	if(!key) { return '[vimeo:]'; }

	return '<iframe src="http://player.vimeo.com/video/'+ key +'?badge=0&amp;color='+ color +'&amp;autoplay=0&amp;loop=0&amp;portrait=1&amp;title=1&amp;byline=1" width="'+ width +'" height="'+ height +'" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>'
};