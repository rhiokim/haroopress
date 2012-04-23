SOURCE_DIR=./source/public
DEPLOY_DIR=./_deploy
PUBLIC_DIR=./_public

init: npm update build
	rm -rf ${DEPLOY_DIR}
	rm -rf ${PUBLIC_DIR}
	mkdir ${DEPLOY_DIR}
	mkdir ${PUBLIC_DIR}

npm:
	npm install -g less
	npm install -g uglify-js
	npm install -g locally

update:
	git submodule update --init --recursive

build:
	rm -rf ./lib/bootstrap/bootstrap/
	cd ./lib/bootstrap/;make bootstrap
	cp -R ./lib/bootstrap/bootstrap/* ${SOURCE_DIR}
	cd ./lib/jquery/;make
	cp ./lib/jquery/dist/* ${SOURCE_DIR}/js
	cp ./lib/requirejs/require.js ${SOURCE_DIR}/js
	cp ./lib/requirejs/text.js ${SOURCE_DIR}/js
	cp ./lib/toc/toc.js ${SOURCE_DIR}/js
	cp ./lib/jquery-jsonp/src/jquery.jsonp.js ${SOURCE_DIR}/js
	cd ./lib/google-code-prettify/;make
	cp ./lib/mustache/mustache.js ${SOURCE_DIR}/js

copy:
	cp ./lib/google-code-prettify/*.js ${SOURCE_DIR}/js
	cp ./lib/google-code-prettify/*.css ${SOURCE_DIR}/css

clear:
	rm -rf ${DEPLOY_DIR}/*
	rm -rf ${PUBLIC_DIR}/*

gen: clear 
	./bin/gen

preview:
	./bin/open-browser
	locally -w ${PUBLIC_DIR} -p 8000
	
github-page:
	cd ./bin/;./setup-github-page

deploy:
	cp -R ${PUBLIC_DIR}/* ${DEPLOY_DIR}
	cd ./bin;./deploy-gh-pages

new-post:
	cd ./bin;./new-post

new-page:
	cd ./bin;./new-page

.PHONY: init update build copy clear
