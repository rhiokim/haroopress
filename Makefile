SOURCE_DIR=./source/public
DEPLOY_DIR=./_deploy
PUBLIC_DIR=./public

init:
	npm install -g less
	npm install -g uglify-js
	npm install -g locally
	git submodule update --init --recursive
	rm -rf ./lib/bootstrap/bootstrap/
	cd ./lib/bootstrap/;make bootstrap
	cp -R ./lib/bootstrap/bootstrap/* ${SOURCE_DIR}
	cd ./lib/jquery/;make
	cp ./lib/jquery/dist/* ${SOURCE_DIR}/js
	cp ./lib/requirejs/require.js ${SOURCE_DIR}/js
	cp ./lib/requirejs/text.js ${SOURCE_DIR}/js
	cp ./lib/toc/toc.js ${SOURCE_DIR}/js
	mkdir _deploy

update:
	git submodule update --init
	cd ./lib/google-code-prettify/;make

copy:
	cp ./lib/google-code-prettify/*.js ${SOURCE_DIR}/js
	cp ./lib/google-code-prettify/*.css ${SOURCE_DIR}/css

clear:
	rm -rf ${DEPLOY_DIR}/*
	rm -rf ${PUBLIC_DIR}/*

gen: clear 
	cp -R ${SOURCE_DIR}/* ${PUBLIC_DIR}
	cd ./bin;./haroo-index

preview:
	locally -w ./public -p 8000
	open http://localhost:8000

github-page:
	cd ./bin/;./setup-github-page

deploy:
	cp -R ${PUBLIC_DIR}/* ${DEPLOY_DIR}
	cd ./bin;./deploy-gh-pages

new-post:
	cd ./bin;./new-post

new-page:
	cd ./bin;./new-page

.PHONY: init update copy clear
