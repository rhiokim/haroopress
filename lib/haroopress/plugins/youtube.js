var width = '100%';

module.exports = function(key, className) {
	className = className || '';
	return '<iframe class="youtube '+ className +'" style="'+width+'" src="https://www.youtube.com/embed/' + key + '"></iframe><br/>';
};