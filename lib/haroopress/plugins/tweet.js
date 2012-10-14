var prefix = 'tw-align-';
var aligns = {
	none: '',
	left: 'tw-align-left',
	right: 'tw-align-right',
	center: 'tw-align-center'
};

function alignWhere(align) {
	var align = align || 'none';
	return aligns.hasOwnProperty(align) && aligns[align];
}

module.exports = function(key, align) {
	var align = alignWhere(align);

	return '<blockquote class="twitter-tweet '+ align +'">'+
				'<p> ^TS</p>&mdash; (@) '+
				'<a href="https://twitter.com/twitterapi/status/'+ key +'" data-datetime=""></a>'+
			'</blockquote>'+
			'<div style="clear:both;"></div>';
};