SOURCE_DIR=./source/public
DEPLOY_DIR=./_deploy

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
	mkdir public

update:
	git submodule update --init
	cd ./lib/google-code-prettify/;make

copy:
	cp ./lib/google-code-prettify/*.js ${SOURCE_DIR}/js
	cp ./lib/google-code-prettify/*.css ${SOURCE_DIR}/css

dc:
	rm -rf ${DEPLOY_DIR}/*

gen: dc
	cp -R ${SOURCE_DIR}/* ${DEPLOY_DIR}
	cd ./bin;./haroo-index

preview:
	locally -w ./_deploy -p 8000
	open http://localhost:8000

github-page:
	cd ./bin/;./setup-github-page

deploy:
	cd ./bin;./deploy-gh-pages

new-post:
	cd ./bin;./new-post

new-page:
	cd ./bin;./new-page

.PHONY: init update copy
