SOURCE_DIR=./source/public
DEPLOY_DIR=./_deploy
PUBLIC_DIR=./_public

init: update setup gh-pages initialize guide

guide:
	clear
	cat ./lib/haroopress/QUICK.markdown

update:
	@echo "========================================"
	@echo "= update & initialize git submodules"
	@echo "========================================"
	git submodule update --init --recursive
	python ./lib/highlight.js/tools/build.py

initialize: 
	@echo "========================================"
	@echo "= create default data set"
	@echo "========================================"
	./bin/init.js

setup:
	@echo "========================================"
	@echo "= configurate haroopress"
	@echo "========================================"
	./bin/setup.js

gh-pages: clear
	@echo "========================================"
	@echo "= setup repository for deployment"
	@echo "========================================"
	cd ./bin/;./gh-pages.js

clear: 
	@echo "========================================"
	@echo "= clear public & deployment directories"
	@echo "========================================"
	./bin/clear.js

gen: clear 
	@echo "========================================"
	@echo "= generate to static page"
	@echo "========================================"
	./bin/gen.js
	mkdir -p ${PUBLIC_DIR}/slides/@asserts
	cp -R ./lib/shower/themes ${PUBLIC_DIR}/slides/@asserts
	cp -R ./lib/shower/scripts ${PUBLIC_DIR}/slides/@asserts
	mkdir -p ${PUBLIC_DIR}/css/code
	cp -R ./lib/highlight.js/src/styles/* ${PUBLIC_DIR}/css/code
	cp -R ./lib/highlight.js/build/* ${PUBLIC_DIR}/js
	cp -R ./lib/bootstrap/* ${PUBLIC_DIR}

preview: gen
	@echo "========================================"
	@echo "= preview static page"
	@echo "========================================"
	./bin/preview.js
	
deploy: gen
	@echo "========================================"
	@echo "= deploy to github"
	@echo "========================================"
	cd ./bin;./deploy.js "${msg}"

new-post:
	cd ./bin;./new-post.js

new-page:
	cd ./bin;./new-page.js

new-slide:
	cd ./bin;./new-slide.js

octopress:
	@echo "========================================"
	@echo "= convert from octopress"
	@echo "========================================"
	cd ./bin/convert/;./octopress.js

.PHONY: init update build clear
