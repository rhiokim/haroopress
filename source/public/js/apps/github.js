var github = (function(){

  function render(target, repos){
    var i = 0, fragment = '';

    for(i = 0; i < repos.length; i++) {
      fragment += '<li><a href="'+ repos[i].url +'" rel="popover" data-content="'+ repos[i].description +' " data-original-title="'+repos[i].name +'">'+repos[i].name+'</a></li>';
    }
    $(fragment).appendTo(target);

        $("a[rel=popover]")
            .popover()
            .click(function(e) {
            e.preventDefault()
            });
  }
  return {
    showRepos: function(options){
      $.jsonp({
          url: "http://github.com/api/v2/json/repos/show/"+options.user+"?callback=?"
        , error: function (err) { $(options.target).addClass('error').text("Error loading feed"); }
        , success: function(data) {
          var repos = [];
          if (!data || !data.repositories) { return; }
          for (var i = 0; i < data.repositories.length; i++) {
            if (options.skip_forks && data.repositories[i].fork) { continue; }
            repos.push(data.repositories[i]);
          }
          repos.sort(function(a, b) {
            var aDate = new Date(a.pushed_at).valueOf(),
                bDate = new Date(b.pushed_at).valueOf();

            if (aDate === bDate) { return 0; }
            return aDate > bDate ? -1 : 1;
          });

          if (options.count) { repos.splice(options.count); }
          render(options.target, repos);
        }
      });
    }
  };
})();