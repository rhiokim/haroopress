function Image() {
    var tagStart = /\{\%/,
        tagEnd = /\%\}/,
        partial = /\{\%\simg\s(.*?)\%\}/g;

    var patternFull = /(\S.*\s+)?((?:https?:\/\/|\/|\S+\/)\S+)(?:\s+(\d+))?(?:\s+(\d+))?(\s+.+)?/i,
        patternTitle = /(?:"|')([^"']+)?(?:"|')\s+(?:"|')([^"']+)?(?:"|')/,
        patternClass = /"/;

    function match(text) {
        var matched, img, desc, cls, res = [];

        matched = text.match(partial);

        if(!matched) {
            return;
        }

        //TODO class parse
        matched.forEach(function(item) {
            partial.global = false;

            item.match(/\{\%\simg\s(.*?)\%\}/);
            
            RegExp.$1.match(patternFull);

            img = {
                input: item,
                cls: RegExp.$1,
                img: RegExp.$2,
                width: RegExp.$3,
                height: RegExp.$4,
                title: RegExp.$5
            }

            img.cls = img.cls && parseClass(img.cls);
            desc = img.title && parseTitle(img.title);

            img.title = desc.title;
            img.alt = desc.alt;

            res.push(img);
        });

        return res;
    }

    function parseClass(text) {
    
    }

    function parseTitle(text) {
        var res = text.match(patternTitle);

        if(!res) {
            return {
                alt: text.replace(/"/g, '').trim(),
                title: ''
            }
        }

        return {
            alt: RegExp.$1,
            title: '"'+ RegExp.$2 +'"'
        }
    }

    var imgStr = '![alt](img title)';

    return {
        toMarkdown: function(text) {
            var img, res = match(text);

            if(res) {
                res.forEach(function(item) {
                    img = imgStr.replace('alt', item.alt).replace('img', item.img).replace('title', item.title);
                    text = text.replace(item.input, img);
                });
            }

            return text;
        }
    }
}

module.exports = Image;
/*
var fs = require('fs');
var image = new Image();

fs.readFile('/Users/kimyangwon/Downloads/source/_posts/2012-04-20-typing-game.markdown', 'utf8', function(err, data) {
    var raw = data.split('---');
    var res = image.toMarkdown(raw[2]);
    console.log(res);
});
*/
