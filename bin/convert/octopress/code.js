function Code() {
    var tagStart = /\{\%/,
        tagEnd = /\%\}/,
        codeBlockStart = /\{\%\scodeblock\s(.*?)\%\}/g,
        codeBlockEnd = /\{\%\sendcodeblock\s\%\}/g;

    var patternFull = /(\S.*\s+)?((?:https?:\/\/|\/|\S+\/)\S+)(?:\s+(\d+))?(?:\s+(\d+))?(\s+.+)?/i,
        patternTitle = /(?:"|')([^"']+)?(?:"|')\s+(?:"|')([^"']+)?(?:"|')/,
        patternClass = /"/;

    var codeType = /\s*lang:(\w+)/i;

    function match(text) {
        var res = [], code, type;

        matched = text.match(codeBlockStart);

        if(!matched) {
            return;
        }

        matched.forEach(function(item) {
            item.match(/\{\%\scodeblock\s(.*?)\%\}/);

            code = {
                input: item,
                type: '',
                jsfiddle: ''
            };
       
            code.type = parseCodeType(RegExp.$1)

            res.push(code);
        });

        return res;
    }

    function parseCodeType(text) {
        var res = text.match(codeType);

        if(!res) {
            return '';
        }

        return RegExp.$1;
    }

    var codeStr = '```type';

    return {
        toMarkdown: function(text) {
            var code, res = match(text);

            if(res) {
                res.forEach(function(item) {
                    code = codeStr.replace('type', item.type);
                    text = text.replace(item.input, code);
                });
            }

            text = text.replace(codeBlockEnd, '```');

            return text;
        }
    }
}

module.exports = Code;
/*
var fs = require('fs');
var image = new Image();

fs.readFile('/Users/kimyangwon/Downloads/source/_posts/2012-04-20-typing-game.markdown', 'utf8', function(err, data) {
    var raw = data.split('---');
    var res = image.toMarkdown(raw[2]);
    console.log(res);
});
*/
