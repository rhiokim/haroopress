var types = {
	success: 'label-success',
	warning: 'label-warning',
	important: 'label-important',
	info: 'label-info',
	inverse: 'label-inverse'
};

function isStyle(type) {
	var prop;

	return types.hasOwnProperty(type) && types[type];
}

module.exports = function(text) {
	var token = text.split(' ');
	var style = isStyle(token[0]);
	style = style ? style : '';

	if(style) {
		token.shift();
		text = token.join(' ');
	}
	
	return '<em class="label '+ style +'"><strong>'+ text +'</strong></em>';
};

