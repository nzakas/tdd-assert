var TDDAssert = (typeof require !== "undefined") ? require("../tdd-assert.js") : window.TDDAssert,
    assert = TDDAssert.assert;


//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

function err(method, text) {
    var thrown = false;

    try {
        method();
    } catch (ex) {
        thrown = true;
        if (ex.message !== text) {
            throw new Error("Wrong message: " + ex.message);
        }
    }

    if (!thrown) {
        throw new Error("No error thrown.");
    }
}

//------------------------------------------------------------------------------
// Actual tests
//------------------------------------------------------------------------------


describe("TDDAssert", function() {

    beforeEach(function() {
        assert.reset();
    });

    describe("assert.ok()", function() {

        it("should not throw an error when the condition is truthy", function() {
            assert.ok(true);
            assert.ok(1);
            assert.ok("foo");
            assert.ok({});
        });

        it("should throw an error when the condition is false", function() {
            err(function() {
                assert.ok(false, "Foo");
            }, "Foo");
        });

        it("should throw an error with the default message when the condition is false", function() {
            err(function() {
                assert.ok(false);
            }, "Expected value to be truthy.");
        });

        it("should throw an error when the condition is 0", function() {
            err(function() {
                assert.ok(0, "Foo");
            }, "Foo");
        });

        it("should throw an error when the condition is an empty string", function() {
            err(function() {
                assert.ok("", "Foo");
            }, "Foo");
        });

        it("should throw an error when the condition is null", function() {
            err(function() {
                assert.ok(null, "Foo");
            }, "Foo");
        });

        it("should throw an error when the condition is undefined", function() {
            err(function() {
                assert.ok(undefined, "Foo");
            }, "Foo");
        });

    });

    describe("assert.fail()", function() {

        it("should throw an error", function() {
            err(function() {
                assert.fail("Foo");
            }, "Foo");
        });

    });

    describe("assert.asserted()", function() {

        it("should not throw an error if there were asserts", function() {
            assert.ok(true);
            assert.asserted();
        });

        it("should throw an error if there were no asserts", function() {
            err(function() {
                assert.asserted("Foo");
            }, "Foo");
        });

        it("should throw an error with the default message if there were no asserts", function() {
            err(function() {
                assert.asserted();
            }, "Expected one or more assertions.");
        });

    });


    describe("assert.isTrue()", function() {

        it("should not throw an error when the condition is true", function() {
            assert.isTrue(true);
        });

        it("should throw an error when the condition is false", function() {
            err(function() {
                assert.isTrue(false, "Foo");
            }, "Foo");
        });

        it("should throw an error with the default message when the condition is false", function() {
            err(function() {
                assert.isTrue(false);
            }, "Expected value to be true.");
        });

        it("should throw an error when the condition is 0", function() {
            err(function() {
                assert.isTrue(0, "Foo");
            }, "Foo");
        });

        it("should throw an error when the condition is an empty string", function() {
            err(function() {
                assert.isTrue("", "Foo");
            }, "Foo");
        });

        it("should throw an error when the condition is null", function() {
            err(function() {
                assert.isTrue(null, "Foo");
            }, "Foo");
        });

        it("should throw an error when the condition is undefined", function() {
            err(function() {
                assert.isTrue(undefined, "Foo");
            }, "Foo");
        });

        it("should throw an error when the condition is 1", function() {
            err(function() {
                assert.isTrue(1, "Foo");
            }, "Foo");
        });

    });

    describe("assert.isFalse()", function() {

        it("should not throw an error when the condition is false", function() {
            assert.isFalse(false);
        });

        it("should throw an error when the condition is true", function() {
            err(function() {
                assert.isFalse(true, "Foo");
            }, "Foo");
        });

        it("should throw an error with the default message when the condition is true", function() {
            err(function() {
                assert.isFalse(true);
            }, "Expected value to be false.");
        });

        it("should throw an error when the condition is 0", function() {
            err(function() {
                assert.isFalse(0, "Foo");
            }, "Foo");
        });

        it("should throw an error when the condition is an empty string", function() {
            err(function() {
                assert.isFalse("", "Foo");
            }, "Foo");
        });

        it("should throw an error when the condition is null", function() {
            err(function() {
                assert.isFalse(null, "Foo");
            }, "Foo");
        });

        it("should throw an error when the condition is undefined", function() {
            err(function() {
                assert.isFalse(undefined, "Foo");
            }, "Foo");
        });

        it("should throw an error when the condition is 1", function() {
            err(function() {
                assert.isFalse(1, "Foo");
            }, "Foo");
        });

    });

    describe("assert.equal()", function() {

        it("should not throw an error when numeric values are equal", function() {
            assert.equal(5, 5);
        });

        it("should not throw an error when boolean values are equal", function() {
            assert.equal(true, true);
        });

        it("should not throw an error when string values are equal", function() {
            assert.equal("foo", "foo");
        });

        it("should not throw an error when null values are equal", function() {
            assert.equal(null, null);
        });

        it("should not throw an error when undefined values are equal", function() {
            assert.equal(undefined, undefined);
        });

        it("should not throw an error when a numeric and a string value are equal", function() {
            assert.equal(5, "5");
        });

        it("should not throw an error when a null and undefined are equal", function() {
            assert.equal(null, undefined);
        });

        it("should throw an error when comparing two different objects", function() {
            err(function() {
                assert.equal({}, {}, "Foo");
            }, "Foo");
        });

        it("should throw an error with the default message when comparing two different objects", function() {
            err(function() {
                assert.equal({}, {});
            }, "Expected values to be equal.");
        });

        it("should throw an error when comparing two different values", function() {
            err(function() {
                assert.equal("5", 27, "Foo");
            }, "Foo");
        });

    });


    describe("assert.notEqual()", function() {

        it("should not throw an error when numeric values are not equal", function() {
            assert.notEqual(5, 6);
        });

        it("should not throw an error when boolean values are not equal", function() {
            assert.notEqual(true, false);
        });

        it("should not throw an error when string values are not equal", function() {
            assert.notEqual("foo", "bar");
        });

        it("should not throw an error when a numeric and a string value are not equal", function() {
            assert.notEqual(5, "6");
        });

        it("should throw an error when comparing numeric values that are equal", function() {
            err(function() {
                assert.notEqual(5, 5, "Foo");
            }, "Foo");
        });

        it("should throw an error when comparing numeric and string values that are equal", function() {
            err(function() {
                assert.notEqual(5, "5", "Foo");
            }, "Foo");
        });

        it("should throw an error with the default message when comparing numeric values that are equal", function() {
            err(function() {
                assert.notEqual(5, 5);
            }, "Expected values not to be equal.");
        });

    });

    describe("assert.strictEqual()", function() {

        it("should not throw an error when numeric values are strictly equal", function() {
            assert.strictEqual(5, 5);
        });

        it("should not throw an error when boolean values are strictly equal", function() {
            assert.strictEqual(true, true);
        });

        it("should not throw an error when string values are strictly equal", function() {
            assert.strictEqual("foo", "foo");
        });

        it("should not throw an error when null values are strictly equal", function() {
            assert.strictEqual(null, null);
        });

        it("should not throw an error when undefined values are strictly equal", function() {
            assert.strictEqual(undefined, undefined);
        });

        it("should throw an error with the default message when a numeric and a string value are not strictly equal", function() {
            err(function() {
                assert.strictEqual(5, "5");
            }, "Expected values to be strictly equal.");

        });

        it("should throw an error when comparing two different objects", function() {
            err(function() {
                assert.strictEqual({}, {}, "Foo");
            }, "Foo");
        });

        it("should throw an error when comparing two different values", function() {
            err(function() {
                assert.strictEqual("5", 27, "Foo");
            }, "Foo");
        });

    });


    describe("assert.notStrictEqual()", function() {

        it("should not throw an error when numeric values are not strictly equal", function() {
            assert.notStrictEqual(5, 6);
        });

        it("should not throw an error when boolean values are not strictly equal", function() {
            assert.notStrictEqual(true, false);
        });

        it("should not throw an error when string values are not strictly equal", function() {
            assert.notStrictEqual("foo", "bar");
        });

        it("should not throw an error when a numeric and a string value are not strictly equal", function() {
            assert.notStrictEqual(5, "6");
        });

        it("should throw an error with the default message when comparing numeric values that are strictly equal", function() {
            err(function() {
                assert.notStrictEqual(5, 5);
            }, "Expected values not to be strictly equal.");
        });

        it("should throw an error when comparing numeric values that are strictly equal", function() {
            err(function() {
                assert.notStrictEqual(5, 5, "Foo");
            }, "Foo");
        });

    });

    describe("assert.throws()", function() {

        it("should not throw an error when an error is thrown", function() {
            assert.throws(function() {
                throw new Error("Foo");
            });
        });

        it("should not throw an error when an error with a specific message is thrown", function() {
            assert.throws(function() {
                throw new Error("Foo");
            }, "Foo");
        });

        it("should not throw an error when a specific type of error is thrown", function() {
            assert.throws(function() {
                throw new TypeError("Foo");
            }, TypeError);
        });


        it("should not throw an error when an error is thrown", function() {
            assert.throws(function() {
                throw new Error("Foo");
            });
        });


        it("should throw an error with the default message when an error is not thrown", function() {
            err(function() {
                assert.throws(function() {
                    // noop
                });
            }, "Expected error to be thrown.");
        });

        it("should throw an error when an error is not thrown", function() {
            err(function() {
                assert.throws(function() {
                    // noop
                }, "Foo", "Bar");
            }, "Bar");
        });


        it("should throw an error when an error with a specific message is not thrown", function() {
            err(function() {
                assert.throws(function() {
                    throw new Error("Baz");
                }, "Foo", "Bar");
            }, "Bar");
        });

        it("should throw an error with the default message when an error with a specific message is not thrown", function() {
            err(function() {
                assert.throws(function() {
                    throw new Error("Baz");
                }, "Foo");
            }, "Expected error message to be 'Foo'.");
        });

        it("should throw an error with the default message when an error of a specific type is not thrown", function() {
            err(function() {
                assert.throws(function() {
                    throw new Error("Baz");
                }, TypeError);
            }, "Expected thrown error to be instance of TypeError.");
        });

        it("should throw an error with the default message when an object of a specific type is not thrown", function() {
            function CustomError(){}

            err(function() {
                assert.throws(function() {
                    throw new Error("Baz");
                }, CustomError);
            }, "Expected thrown error to be instance of " + CustomError + ".");
        });


    });

    describe("assert.doesNotThrow()", function() {

        it("should not throw an error when no error is thrown", function() {
            assert.doesNotThrow(function(){});
        });

        it("should throw an error when an error is thrown", function() {
            err(function() {
                assert.doesNotThrow(function() {
                    throw new Error("Foo");
                }, "Msg");
            }, "Msg");
        });

        it("should throw an error with the default message when an error is thrown", function() {
            err(function() {
                assert.doesNotThrow(function() {
                    throw new Error("Foo");
                });
            }, "Expected not to throw an error.");
        });

    });


});

