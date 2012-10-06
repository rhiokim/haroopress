module.exports = function(key, className) {
	className = className || '';
	return '<iframe class="youtube '+ className +'" src="https://www.youtube.com/embed/' + key + '"></iframe>';
};