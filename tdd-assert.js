/**
 * @fileoverview Simple assertion library for use with TDD frameworks.
 * @author Nicholas C. Zakas
 */


/**
 * Top level namespace.
 * @namespace
 */
var TDDAssert = {};

//------------------------------------------------------------------------------
// Custom Types
//------------------------------------------------------------------------------

/**
 * The object type that is thrown when an assertion error occurs.
 * @param {string} message The error message.
 * @constructor
 */
TDDAssert.AssertionError = function(message) {
    this.message = message;
};

TDDAssert.AssertionError.prototype = new Error();
TDDAssert.AssertionError.prototype.name = "AssertionError";
TDDAssert.AssertionError.prototype.constructor = TDDAssert.AssertionError;

//------------------------------------------------------------------------------
// Primary Interface
//------------------------------------------------------------------------------

/**
 * Where the assertions live.
 * @namespace
 */
TDDAssert.assert = (function() {

    "use strict";

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------

    var count = 0;



    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    /**
     * Basic assertion function that is used as the central point of tracking
     * assertions.
     * @param {boolean} value The condition to check.
     * @param {string} [message] The message to use if the assertion fails.
     * @private
     */
    function assert(value, message) {
        count++;

        if (!value) {
            throw new TDDAssert.AssertionError(message);
        }
    }

    /**
     * Simple string formatting using {name} as the key to replace. The name is
     * then matched with a named property passed in as part of the second
     * argument.
     * @param {string} text The text to format.
     * @param {Object} data The values to use for replacement.
     * @returns {string} The formatted string.
     * @private
     */
    function format(text, data) {
        return text.replace(/\{.*?\}/g, function(match) {
            var name = match.substring(1, match.length - 1);
            return data[name];
        });
    }

    //--------------------------------------------------------------------------
    // Assertions
    //--------------------------------------------------------------------------

    /**
     * Main assertion object.
     * @name TDDAssert
     * @namespace
     */
    return {

        //----------------------------------------------------------------------
        // Assertion tracking
        //----------------------------------------------------------------------

        /**
         * Asserts that assertions were made.
         * @param {string} [message] The message to use if assertion fails.
         * @returns {void}
         * @throws {AssertionError} If no assertions were made.
         */
        asserted: function(message) {
            assert(count > 0, message || "Expected one or more assertions.");
        },

        /**
         * Resets the assertion count.
         * @returns {void}
         */
        reset: function() {
            count = 0;
        },

        //----------------------------------------------------------------------
        // Basic asserts
        //----------------------------------------------------------------------

        /**
         * Simple assertion based on boolean condition.
         * @param {boolean} value The condition to evaluate.
         * @param {string} [message] The message to use if assertion fails.
         * @returns {void}
         * @throws {AssertionError} If the condition is falsy.
         */
        ok: function(value, message) {
            assert(value, message || "Expected value to be truthy.");
        },

        /**
         * Throws an assertion error.
         * @param {string} message The message to use.
         * @returns {void}
         * @throws {AssertionError} All the time.
         */
        fail: function(message) {
            throw new TDDAssert.AssertionError(message);
        },

        //----------------------------------------------------------------------
        // Boolean asserts
        //----------------------------------------------------------------------

        /**
         * Asserts that a condition is true.
         * @param {boolean} value The condition to evaluate.
         * @param {string} [message] The message to use if assertion fails.
         * @returns {void}
         * @throws {AssertionError} If the condition is not true.
         */
        isTrue: function(value, message) {
            assert(value === true, message || "Expected value to be true.");
        },

        /**
         * Asserts that a condition is false.
         * @param {boolean} value The condition to evaluate.
         * @param {string} [message] The message to use if assertion fails.
         * @returns {void}
         * @throws {AssertionError} If the condition is not false.
         */
        isFalse: function(value, message) {
            assert(value === false, message || "Expected value to be false.");
        },

        //----------------------------------------------------------------------
        // Equality asserts
        //----------------------------------------------------------------------

        /**
         * Asserts two values are equal.
         * @param {any} actual The value to check.
         * @param {any} expected The value to check against.
         * @param {string} [message] The message to use if assertion fails.
         * @returns {void}
         * @throws {AssertionError} If the values are not equal.
         */
        equal: function(actual, expected, message) {
            assert(actual == expected, message || "Expected values to be equal.");
        },

        /**
         * Asserts two values are not equal.
         * @param {any} actual The value to check.
         * @param {any} expected The value to check against.
         * @param {string} [message] The message to use if assertion fails.
         * @returns {void}
         * @throws {AssertionError} If the values are equal.
         */
        notEqual: function(actual, expected, message) {
            assert(actual != expected, message || "Expected values not to be equal.");
        },

        /**
         * Asserts two values are strictly equal.
         * @param {any} actual The value to check.
         * @param {any} expected The value to check against.
         * @param {string} [message] The message to use if assertion fails.
         * @returns {void}
         * @throws {AssertionError} If the values are not strictly equal.
         */
        strictEqual: function(actual, expected, message) {
            assert(actual === expected, message || "Expected values to be strictly equal.");
        },

        /**
         * Asserts two values are not strictly equal.
         * @param {any} actual The value to check.
         * @param {any} expected The value to check against.
         * @param {string} [message] The message to use if assertion fails.
         * @returns {void}
         * @throws {AssertionError} If the values are strictly equal.
         */
        notStrictEqual: function(actual, expected, message) {
            assert(actual !== expected, message || "Expected values not to be strictly equal.");
        },

        //----------------------------------------------------------------------
        // Error asserts
        //----------------------------------------------------------------------

        /**
         * Asserts that a function throws an error.
         * @param {Function} method The code to execution.
         * @param {Error|string} [error] The type of error or error message to
         *      check for.
         * @param {string} [message] The message to use if assertion fails.
         * @returns {void}
         * @throws {AssertionError} If the code doesn't throw an error of the
         *      specified type.
         */
        throws: function(method, error, message) {

            var thrown = false;

            try {

                method();

            } catch(ex) {

                thrown = true;

                if (typeof error === "function") {

                    assert(ex instanceof error,
                        message || format("Expected thrown error to be instance of {name}.",
                            { name: error.prototype.name || error.toString() }));

                } else if (typeof error === "string") {

                    this.equal(ex.message, error,
                        message || format("Expected error message to be '{msg}'.", { msg: error }));

                }

            }

            if (!thrown) {
                this.fail(message || "Expected error to be thrown.");
            }

        },

        /**
         * Asserts that a function does not throw an error.
         * @param {Function} method The code to execution.
         * @param {string} [message] The message to use if assertion fails.
         * @returns {void}
         * @throws {AssertionError} If the code throws an error.
         */
        doesNotThrow: function(method, message) {

            try {
                method();
            } catch (ex) {
                this.fail(message || "Expected not to throw an error.");
            }
        }
    };

}());


if (typeof exports !== "undefined") {
    module.exports = TDDAssert;
}
