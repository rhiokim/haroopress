function github(options){
    var url = "http://github.com/api/v2/json/repos/show/"+ options.user +"?callback=?";
    var data = {
        repos: [],
        link: function() {
            return '<a href="'+ this.url +'" rel="popover" data-content="">'+ this.name +'</a>';
        },
        fcnt: function() {
            return '<span class=\'label\'>forks '+ this.forks +'</span>';
        },
        wcnt: function() {
            return '<span class=\'label\'>watched '+ this.watchers +'</span>';
        },
        icnt: function() {
            return '<span class=\'label label-warning\'>issues '+ this.open_issues +'</span>';
        },
        body: function() {
            return this.description;
        }
    };
    var view = '<ul>{{#repos}}<li><a href="{{url}}" rel="popover" data-content="<p>{{fcnt}} {{wcnt}} {{icnt}}</p> {{body}}" data-original-title="{{name}}" target="_blank">{{name}}</a></li>{{/repos}}</ul>';

    function render(target, repos){
        data.repos = repos;
        $(Mustache.render(view, data)).appendTo(target);
    }

    /* sort by pushed date */
    function sort(repos) {
        repos.sort(function(a, b) {

            var aDate = new Date(a.pushed_at).valueOf(),
                bDate = new Date(b.pushed_at).valueOf();

            if (aDate === bDate) {
                return 0;
            }
            return aDate > bDate ? -1 : 1;
        });

        return repos;
    }

    /* success callback */
    function successHandler(data) {
        var i, repo, repos = [];

        /* none repository */
        if (!data || !data.repositories) {
            return;
        }

        for (i = 0; i < data.repositories.length; i++) {
            repo = data.repositories[i];
            if (options.skipForks && repo.fork) {
                continue;
            }
            repos.push(repo);
        }

        repos = sort(repos);

        if (options.count) {
            repos.splice(options.count);
        }

        render(options.target, repos);

        /* repo link popover */
        $("a[rel=popover]").popover();

        $(options.target +' .bar').width('100%');
        $(options.target +' .progress').hide();
    }

    /* error callback */
    function errorHandler(err) {
        $(options.target).addClass('error').text("Error loading feed");
    }

    $(options.target + ' .bar').animate({width: '100%'});

    $.jsonp({
        url: url,
        error: errorHandler,
        success: successHandler
    });
}
