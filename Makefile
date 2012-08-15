SOURCE_DIR=./source/public
DEPLOY_DIR=./_deploy
PUBLIC_DIR=./_public

init: update setup gh-pages initialize

update:
	@echo "========================================"
	@echo "= update & initialize git submodules"
	@echo "========================================"
	git submodule update --init --recursive

initialize:
	@echo "========================================"
	@echo "= create default data set"
	@echo "========================================"
	./bin/init.js

build:
	@echo "========================================"
	@echo "= build submodules"
	@echo "========================================"
	cd ./bin/;./build.js

setup:
	@echo "========================================"
	@echo "= configurate haroopress"
	@echo "========================================"
	./bin/setup.js

gh-pages:
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
	cp -R ./lib/shower ${PUBLIC_DIR}/slides/_asserts

preview:
	@echo "========================================"
	@echo "= preview static page"
	@echo "========================================"
	./bin/preview.js
	
deploy:
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
