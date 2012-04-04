var fs = require('fs'),
    ejs = require('ejs'),
    path = require('path');

function Renderer() {
    var dir;

    function partial(file, data) {
        var partial = fs.readFileSync(path.resolve(dir, file) +'.ejs', 'utf8');

        partial = ejs.render(partial, data);
        return partial;
    }

    function body(file, data) {
        var body = fs.readFileSync(path.resolve(dir, file) +'.ejs', 'utf8');
        
        data.partial = partial;

        body = ejs.render(body, data);
        return body;
    }

    return {
        setViewDir: function(_dir) {
            dir = _dir;    
        },

        partial: partial, 

        render: function(file, data) {
            var layout = fs.readFileSync(path.resolve(dir, 'layout') +'.ejs', 'utf8');

            data.body = body(file, data);
            data.partial = partial;

            layout = ejs.render(layout, data);

            return layout;
        }
    }
}

module.exports = new Renderer();
