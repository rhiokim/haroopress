var types = {
	success: 'alert-success',
	warning: ' ',
	error: 'alert-error',
	info: 'alert-info',
	inverse: 'alert-inverse'
};

function isAlert(type) {
	var prop;

	return types.hasOwnProperty(type) && types[type];
}

module.exports = function() {
	var token = Array.prototype.slice.apply(arguments);
	var style = isAlert(token[0]);
		style = style ? style : '';

	if(style) {
		token.shift();
		text = token.join(' ');
	}
	
	return '<div class="alert '+ style +'">' +
				text +
			'</div>';
};

