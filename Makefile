update:
	cd ./lib/google-code-prettify/;make

copy:
	cp ./lib/google-code-prettify/*.js ./source/public/js/
	cp ./lib/google-code-prettify/*.css ./source/public/css/

gen:
	cd ./bin/;./gen-index;./gen-main;./gen-rss

preview:
	node app.js

.PHONY: update copy
