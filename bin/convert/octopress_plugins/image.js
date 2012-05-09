var str = '{% img left half http://site.com/images/ninja.png 150 150 "Ninja Attack!" "Ninja in attack posture" %}';
str.match(/(\S.*\s+)?((?:https?:\/\/|\/|\S+\/)\S+)(?:\s+(\d+))?(?:\s+(\d+))?(\s+.+)?/i);

console.log(RegExp.$1);
console.log(RegExp.$2);
console.log(RegExp.$3);
console.log(RegExp.$4);
console.log(RegExp.$5);

var title = RegExp.$5;
title.match(/(?:"|')([^"']+)?(?:"|')\s+(?:"|')([^"']+)?(?:"|')/);

console.log(RegExp.$1);
console.log(RegExp.$2);
