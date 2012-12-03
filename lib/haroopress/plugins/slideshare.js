var _width = 597;
var _height = 486;

module.exports = function(key, width, height, startSlide) {
	width = width || _width;
	height = height || _height;
	startSlide = startSlide || 1;

	return '<iframe src="http://www.slideshare.net/slideshow/embed_code/'+ key +'?startSlide='+ startSlide +'" width="'+ width +'" height="'+ height +'" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC;border-width:1px 1px 0;margin-bottom:5px" allowfullscreen webkitallowfullscreen mozallowfullscreen> </iframe>';
};
