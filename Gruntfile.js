/**
 * @fileoverview Build file for the project.
 * @author nzakas
 */

'use strict';

//------------------------------------------------------------------------------
// Constants
//------------------------------------------------------------------------------

var SRC_DIR = 'lib/',
	BUILD_DIR = 'build/',
	TESTS_DIR = 'tests/',
	REPORTS_DIR = BUILD_DIR + 'reports/',
	INSTRUMENTED_DIR = BUILD_DIR + 'instrument/',

	SRC_FILES = SRC_DIR + '**/*.js',
	TEST_FILES = TESTS_DIR + '**/*.js',
	COVERAGE_DATA_FILES = REPORTS_DIR + '**/*.json',

	INSTRUMENTED_TEST_FILES = INSTRUMENTED_DIR + 'tests/**/*.js';


//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({

		// JSHint all the files
		jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
			lib: {
				src: SRC_FILES
			}
		},

		// Code coverage threshold checks
		coverage: {
			options: {
				thresholds: {
					statements: 95,
					branches: 95,
					lines: 95,
					functions: 95
				},
				dir: REPORTS_DIR,
				root: BUILD_DIR
			}
		},

		// The directory to delete
		clean: [ BUILD_DIR ],

		// Which files to instrument
		instrument : {
			files : SRC_FILES,
			options : {
				lazy : true,
				basePath : INSTRUMENTED_DIR
			}
		},

		// Copy all tests into the instrumented area
		copy: {
			all: {
				src: TEST_FILES,
				dest: INSTRUMENTED_DIR
			}
		},

		// Where to store the coverage report
		storeCoverage : {
			options : {
				dir : REPORTS_DIR
			}
		},

		// How to generate the coverage report
		makeReport : {
			src : COVERAGE_DATA_FILES,
			options : {
				type : 'lcov',
				dir : REPORTS_DIR,
				print: 'print'
			}
		},

		// Which tests to run with Mocha
		mochaTest: {
			test: {
				options: {
					ui: 'tdd',
					reporter: 'spec'
				},
				src: INSTRUMENTED_TEST_FILES
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-istanbul');
	grunt.loadNpmTasks('grunt-istanbul-coverage');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-mocha-test');

	// Default task.
	grunt.registerTask('default', ['test']);
	grunt.registerTask('test', ['jshint', 'clean', 'instrument', 'copy', 'mochaTest', 'storeCoverage', 'makeReport' ]);
};
