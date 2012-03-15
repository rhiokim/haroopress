update:
	cd ./lib/google-code-prettify/;make

copy:
	cp ./lib/google-code-prettify/*.js ./source/public/js/
	cp ./lib/google-code-prettify/*.css ./source/public/css/

gen:
	cd ./bin/;./gen-main	

preview:
	node app.js

.PHONY: update copy
