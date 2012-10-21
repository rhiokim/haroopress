var _width = '560px';
var _height = '315px';

module.exports = function(key, width, height) {
	width = width || _width;
	height = height || _height;
	return '<iframe class="youtube" width="'+width+'" height="'+height+'" src="https://www.youtube.com/embed/' + key + '" frameborder="0" allowfullscreen></iframe><br/>';
};