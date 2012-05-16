SOURCE_DIR=./source/public
DEPLOY_DIR=./_deploy
PUBLIC_DIR=./_public

init: npm update build initialize config gh-pages

npm:
	npm install -g less
	npm install -g uglify-js
	npm install -g locally

update:
	git submodule update --init --recursive

initialize:
	./bin/init.js
build:
	cd ./bin/;./build.js

setup:
	./bin/setup.js

gh-pages:
	cd ./bin/;./gh-pages.js

clear: 
	./bin/clear.js

gen: clear 
	./bin/gen.js

preview:
	./bin/preview.js
	
deploy:
	cd ./bin;./deploy.js

new-post:
	cd ./bin;./new-post.js

new-page:
	cd ./bin;./new-page.js

octopress:
	cd ./bin/convert/;./octopress.js

.PHONY: init update build clear
