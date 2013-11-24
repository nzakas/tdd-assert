all: test

link:
	@npm prune
	@npm link

lint:
	@node node_modules/jshint/bin/jshint tdd-assert.js
	@node node_modules/jshint/bin/jshint package.json

test: link lint
	@echo Running Node.js tests
	@node node_modules/istanbul/lib/cli.js cover node_modules/mocha/bin/_mocha tests/*.js
	@echo Running PhantomJS tests
	@node node_modules/mocha-phantomjs/bin/mocha-phantomjs -R dot tests/tests.htm

docs:
	@echo Generating documentation
	@node node_modules/jsdoc/jsdoc.js -d docs tdd-assert.js
	@echo Documentation has been output to /docs

patch: test
	@git checkout release
	@git merge master
	@npm version patch
	@bash scripts/changelog-update.sh

minor: test
	@git checkout release
	@git merge master
	@npm version minor
	@bash scripts/changelog-update.sh

major: test
	@git checkout release
	@git merge master
	@npm version major
	@bash scripts/changelog-update.sh
