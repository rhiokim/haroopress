var fs = require('fs'),
    md = require('robotskirt');

var prefix = 'slide', seperator = '##';

function getSlideStr(html, id) {
    var id = prefix + id;

    html = md.toHtmlSync(seperator +' '+ html);
    html = '<div class="slide" id="'+ id +'"><div>\n<section>\n'+ html;
    html = html +'\n</section>\n</div></div>';
    
    return html;
}

module.exports = function(text /*, seperator*/) {
    var i = 0, res = [];
    
    seperator = arguments[1] || seperator;

    text = text.split(seperator);
    text.forEach(function(item) {
        if(item.length <= 0) {
            return '';
        }

        res.push(getSlideStr(item, i++));
    });

    return res.join('\n');
};
