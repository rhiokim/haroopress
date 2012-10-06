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
	var type, token;
		
		token = text.split(' ');
		type = isAlert(token[0]) || '';

		text = text.replace(type, '');

	return '<div class="alert '+type+'">' +
              '<button type="button" class="close" data-dismiss="alert">×</button>' +
              text +
            '</div>';
};

