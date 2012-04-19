/**
 * Created by IntelliJ IDEA.
 * User: kimyangwon
 * Date: 12. 4. 11.
 * Time: 오후 2:36
 * To change this template use File | Settings | File Templates.
 */

function toc(target, level) {
	var el, id, pel;

	target = target || '.markdown';
	level = level || 2;

	$(target+ ' '+ level).each(function(idx, header){
		el = $(header);
		id = el.text();
		pel = el.prev().prev();

		if(idx == 0) {
			$('<li><a href="#">'+ id +'</a></li>').appendTo('.subnav ul.nav');
			return;
		}

		if (!pel.length) {
			pel = $('.subnav');
		}
		pel.before('<i id="'+ id +'"></i>');
		$('<li><a href="#'+ id +'">'+ id +'</a></li>').appendTo('.subnav ul.nav');
	});
}

toc('.markdown', 'h1 h2 h3');