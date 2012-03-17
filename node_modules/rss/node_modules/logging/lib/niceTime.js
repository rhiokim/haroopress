
function pad (n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}

var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function twelveHour(hour) {
    return hour == 0 ? 12 : hour > 12 ? hour - 12 : hour;
}

// 26 Feb 16:19:34
function timestamp (d) {
  return  [ d.getDate()
          , months[d.getMonth()]
          , [pad(twelveHour(d.getHours())), pad(d.getMinutes()), pad(d.getSeconds())].join(':')
          ].join(' ');
}

module.exports = timestamp;