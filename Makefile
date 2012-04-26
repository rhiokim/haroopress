SOURCE_DIR=./source/public
DEPLOY_DIR=./_deploy
PUBLIC_DIR=./_public

init: npm update build

npm:
	npm install -g less
	npm install -g uglify-js
	npm install -g locally

update:
	git submodule update --init --recursive

build:
	cd ./bin/;./build.js
	
clear: 
	./bin/clear.js

gen: clear 
	./bin/gen

preview:
	./bin/preview.js
	#locally -w ${PUBLIC_DIR} -p 8000
	
github-page:
	cd ./bin/;./setup-github-page

deploy:
	cd ./bin;./deploy-gh-pages

new-post:
	cd ./bin;./new-post

new-page:
	cd ./bin;./new-page

.PHONY: init update build clear
