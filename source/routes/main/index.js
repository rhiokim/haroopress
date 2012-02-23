var cnf = require(process.cwd()+'/config');

module.exports = function(req, res) {
    res.render('main', cnf);
};
