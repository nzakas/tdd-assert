
link:
	@npm prune
	@npm link

test: link
	@echo Running Node.js tests
	@node node_modules/istanbul/lib/cli.js cover node_modules/mocha/bin/_mocha tests/*.js
	@echo Running PhantomJS tests
	@node node_modules/mocha-phantomjs/bin/mocha-phantomjs tests/tests.htm
