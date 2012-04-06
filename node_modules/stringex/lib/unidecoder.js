var yaml  = require('js-yaml'),
    utils = require('./utils'),
    fs    = require('fs');

var Unidecoder = function() {};
  
Unidecoder.prototype.decode = function decode(string) {
  var temp = string;
  var replacements = [];
  for (i = 0; i < temp.length; i++) {
    c = temp[i];
    if (c.match(/([^\x00-\x7f])/)) {
      codepoint = c.charCodeAt(0);
      codegroup = this.getCodeGroup(codepoint);
      replacements.push({ character: c, codepoint: codepoint, codegroup: codegroup });
    }
  }

  utils.each(replacements, function(replacement) {
    try {
      contents = fs.readFileSync(__dirname + '/unidecoder_data/' + replacement.codegroup + '.yml', 'utf8');
      var doc = yaml.load(contents);
      transliterated = doc[replacement.codepoint & 255];
      temp = temp.replace(new RegExp(replacement.character, 'g'), transliterated);
    } catch (ex) { /* Ignore this character */ }
  });

  return temp;
}

Unidecoder.prototype.getCodeGroup = function getCodeGroup(codepoint) {
  var decimal = codepoint >> 8;
  if (decimal.toString().length > 1) return 'x' + this.dec2hex(decimal);
  else return 'x0' + this.dec2hex(decimal);
}

Unidecoder.prototype.dec2char = function dec2char(n) {
  var result = '';
  if (n <= 0xFFFF) { result += String.fromCharCode(n); } 
  else if (n <= 0x10FFFF) {
    n -= 0x10000
    result += String.fromCharCode(0xD800 | (n >> 10)) + String.fromCharCode(0xDC00 | (n & 0x3FF));
  }
  return result;
}

Unidecoder.prototype.dec2hex = function dec2hex (n) {
  return (n+0).toString(16).toUpperCase();
}

module.exports = new Unidecoder();