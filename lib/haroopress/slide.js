var fs = require('fs'),
    md = require('robotskirt');

var prefix = 'slide', className ='slide ', seperator = '=====', isCover = true;

function getSlideStr(text, id) {
    var cover = (isCover && id == 0) ? 'cover' : '';
    id = prefix + id;

    text = md.toHtmlSync(text);
    text = '<div class="slide '+ cover +'" id="'+ id +'"><div>\n<section>\n'+ text;
    text = text +'\n</section>\n</div></div>';
    
    return text;
}

module.exports = function(text, displayCover /*, seperator or cover*/) {
    var i = 0, res = [], next;

    isCover = !!displayCover;
    seperator = arguments[2] || seperator;

    text = text.split(seperator);
    text.forEach(function(item, idx) {
        if(item.length <= 0) {
            return '';
        }

        res.push(getSlideStr(item, i++));
    });

    return res.join('\n');
};
