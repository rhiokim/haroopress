var fs = require('fs'),
    md = require('robotskirt');

var prefix = 'slide', className ='slide ', mainSeperator = '=====', subSeperator = '-----', isCover = true;

function getSlideStr(text, id) {
    var cover = (isCover && id == 0) ? 'cover' : '';
    id = prefix + id;

    text = md.toHtmlSync(text);
    text = '<div class="slide '+ cover +'" id="'+ id +'"><div>\n<section>\n'+ text;
    text = text +'\n</section>\n</div></div>';
    
    return text;
}

module.exports = function(text, displayCover /*, seperator or cover*/) {
    var i = 0, tmp = [], res = [], next, child;

    isCover = !!displayCover;

    text = text.split(mainSeperator);
    text.forEach(function(item, idx) {
        child = item.split(subSeperator);
        tmp = tmp.concat(child);
    });

    tmp.forEach(function(item, idx) {
        if(item.length <= 0) {
            return '';
        }

        res.push(getSlideStr(item, i++));
    });

    return res.join('\n');
};
