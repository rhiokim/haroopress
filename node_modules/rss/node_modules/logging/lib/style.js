module.exports = function color(color, text) {
    return color + text + RESET;
};

var RESET = module.exports.RESET =  '\x1B[0m';

module.exports.GREY =    '\x1B[0;30m';
module.exports.RED =     '\x1B[0;31m';
module.exports.GREEN =   '\x1B[0;32m';
module.exports.YELLOW =  '\x1B[0;33m';
module.exports.BLUE =    '\x1B[0;34m';
module.exports.MAGENTA = '\x1B[0;35m';
module.exports.CYAN =    '\x1B[0;36m';
module.exports.WHITE =   '\x1B[0;37m';

module.exports.GREY_BOLD =    '\x1B[1;30m';
module.exports.RED_BOLD =     '\x1B[1;31m';
module.exports.GREEN_BOLD =   '\x1B[1;32m';
module.exports.YELLOW_BOLD =  '\x1B[1;33m';
module.exports.BLUE_BOLD =    '\x1B[1;34m';
module.exports.MAGENTA_BOLD = '\x1B[1;35m';
module.exports.CYAN_BOLD =    '\x1B[1;36m';
module.exports.WHITE_BOLD =   '\x1B[1;37m';



