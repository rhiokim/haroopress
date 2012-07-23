var fs = require('fs'),
    md = require('robotskirt');

var prefix = 'slide', className ='slide ', seperator = '##', isCover = true;

function getSlideStr(html, id) {
    var cover = (isCover && id == 0) ? 'cover' : '';
    id = prefix + id;

    html = md.toHtmlSync(seperator +' '+ html);
    html = '<div class="slide '+ cover +'" id="'+ id +'"><div>\n<section>\n'+ html;
    html = html +'\n</section>\n</div></div>';
    
    return html;
}

module.exports = function(text, displayCover /*, seperator or cover*/) {
    var i = 0, res = [];

    isCover = !!displayCover;
    seperator = arguments[2] || seperator;

    text = text.split(seperator);
    text.forEach(function(item) {
        if(item.length <= 0) {
            return '';
        }

        res.push(getSlideStr(item, i++));
    });

    return res.join('\n');
};
