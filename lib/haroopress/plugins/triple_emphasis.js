var types = {
	error: 'alert-error',
	success: 'alert-success',
	info: 'alert-info'
};

function isAlert(type) {
	var prop;

	return types.hasOwnProperty(type) && types[type];
}

module.exports = function(text) {
	var token = text.split(' ');
	var style = isAlert(token[0]);
	style = style ? style : '';

	if(style) {
		token.shift();
		text = token.join(' ');
	}
	
	return '<em class="alert '+ style +'"><strong>'+ text +'</strong></em>';

	return '<div class="alert '+type+'">' +
              '<button type="button" class="close" data-dismiss="alert">×</button>' +
              text +
            '</div>';
};

