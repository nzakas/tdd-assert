# TDDAssert

TDDAssert is a simple assertion library that can be used in browsers and in Node.js. It began once I discovered that I couldn't use Chai for in both locations for my purposes. I needed an assertion library that would work back to Internet Explorer 7 and also one that could count assertions by default. TDDAssert feels this need in a minimalist way. I've started with the bare minimum functionality and will add more as it becomes necessary (or as requested).

This library is intended for use with Mocha but can be used with any JavaScript testing framework.

## Assertions

The assertions at this point are pretty basic. I'm happy to add more if there's a need, but I started with the ones I use the most.

```js
// truthy values
assert.ok(value, "optional message");

// auto fail
assert.fail("optional message");

// boolean values
assert.isTrue(value, "optional message");
assert.isFalse(value, "optional message");

// equality
assert.equal(actual, expected, "optional message");
assert.notEqual(actual, expected, "optional message");
assert.strictEqual(actual, expected, "optional message");
assert.notStrictEqual(actual, expected, "optional message");

// errors
assert.throws(function() {
    // code
}, "optional expected error message", "optional failure message");

assert.throws(function() {
    // code
}, OptionalErrorType, "optional failure message");

assert.doesNotThrow(function() {
    // code
});

// assertion counting
assert.reset();         // reset count
assert.asserted();      // fails if no assertions took place
```
