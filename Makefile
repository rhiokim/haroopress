SOURCE_DIR=./source/public
DEPLOY_DIR=./_deploy
PUBLIC_DIR=./_public

init: npm update build

setup: config gh-pages

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
	./bin/gen.js

preview:
	./bin/preview.js
	
config:
	./bin/configuration.js

gh-pages:
	cd ./bin/;./setup.js

deploy:
	cd ./bin;./deploy.js

new-post:
	cd ./bin;./new-post.js

new-page:
	cd ./bin;./new-page.js

.PHONY: init update build clear
