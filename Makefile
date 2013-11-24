

# Programs
jsonlint=node_modules/jsonlint/lib/cli.js
eslint=node_modules/eslint/bin/eslint
istanbul=node_modules/istanbul/lib/cli.js
mochanode=node_modules/mocha/bin/_mocha
mochaphantom=node_modules/mocha-phantomjs/bin/mocha-phantomjs
jsdoc=node_modules/jsdoc/jsdoc.js

# Tasks

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
	@node $(istanbul) cover $(mochanode) tests/*.js
	@echo Running PhantomJS tests
	@node $(mochaphantom) -R dot tests/tests.htm

docs:
	@echo Generating documentation
	@node $(jsdoc) -d docs tdd-assert.js
	@echo Documentation has been output to /docs

