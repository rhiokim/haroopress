module.exports = function(key, tabs, skin, height, width) {
	var fiddle   = key
	var sequence = ((tabs || 'default') == 'default') ? 'js,resources,html,css,result' : tabs ;
	var skin     = ((skin || 'default') == 'default') ? 'light' : skin ;
	var width    = width || '100%'
	var height   = height || '300px'

	return '<iframe style="width:'+width+'; height:'+height+'" src="http://jsfiddle.net/'+fiddle+'/embedded/'+sequence+'/'+skin+'/"></iframe>';
};

