
jsonlint=node_modules/jsonlint/lib/cli.js
eslint=node_modules/eslint/bin/eslint



all: test

link:
	@npm prune
	@npm install

lint:
	@node $(jsonlint) -q -c package.json
	@node $(jsonlint) -q -c .eslintrc
	@node $(eslint) tdd-assert.js

test: link lint
	@echo Running Node.js tests
	@node node_modules/istanbul/lib/cli.js cover node_modules/mocha/bin/_mocha tests/*.js
	@echo Running PhantomJS tests
	@node node_modules/mocha-phantomjs/bin/mocha-phantomjs -R dot tests/tests.htm

docs:
	@echo Generating documentation
	@node node_modules/jsdoc/jsdoc.js -d docs tdd-assert.js
	@echo Documentation has been output to /docs

