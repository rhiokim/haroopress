function github(options){
    var url = "http://github.com/api/v2/json/repos/show/"+ options.user +"?callback=?";

    function render(target, repos){
        var i = 0, fragment = '';

        for(i = 0; i < repos.length; i++) {
            console.log(repos[i])
            fragment += '<li><a href="'+ repos[i].url +'" rel="popover" data-content="fork: <span class=\'badge badge-info\'>'+ repos[i].forks +'</span> watched: <span class=\'badge badge-info\'>'+ repos[i].watchers +'</span> issues: <span class=\'badge badge-warning\'>'+ repos[i].open_issues +'</span><br/>'+ repos[i].description +'" data-original-title="'+repos[i].name +'" target="_blank">'+repos[i].name+'</a></li>';
        }

        $(fragment).appendTo(target);
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
    }

    /* error callback */
    function errorHandler(err) {
        $(options.target).addClass('error').text("Error loading feed");
    }

    $.jsonp({
        url: url,
        error: errorHandler,
        success: successHandler
    });
}
