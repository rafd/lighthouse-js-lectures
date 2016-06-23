// say we want to create a function that keeps track of the number of times it was called
// without knowing about closures, we could write it like this:

var fooCallCount = 0;

var foo = function() {
  fooCallCount += 1;
  console.log("hello " + fooCallCount);
}

foo(); // "hello 1"
foo(); // "hello 2"


// but, wouldn't it be nice if we didn't have to have the extra variable sitting around?

// we could wrap everything we did before inside a function:

var fooFactory = function () {
  var fooCallCount = 0;

  return function() {
    fooCallCount += 1;
    console.log("hello " + fooCallCount);
  }
}

// works just like before:

var foo = fooFactory();
foo(); // "hello 1"
foo(); // "hello 2"

// but, we have created a closure
// foo remembers the value of fooCallCount, even after fooFactory has finished being invoked

// fooFactory is a function:

console.log(fooFactory); // [function]

// fooFactory returns a function:

console.log(fooFactory()); // [function]

// we can call the function that fooFactory returns by giving it a name and then invoking it:

var foo = fooFactory();
console.log( foo() ); // "hello 1"

// or, we can immediately invoke it:

console.log( ( fooFactory() )() );  // "hello 1"


// ASIDE:

// here is an anonymous function:

function() { console.log("x") };

// here we give an anonymous function a name:

var foo = function() { console.log("x") }

// here's how we call it:

foo();

// we could also call it like this:

(foo)();

// and so... we could also write:

(function() { console.log("x") })();

// the above pattern is called an IIFE (Immediately Invoked Function Expression)

// END OF ASIDE


// back to our fooFactory,
// this is where we were at:

var fooFactory = function () {
  var fooCallCount = 0;

  return function() {
    fooCallCount += 1;
    console.log("hello " + fooCallCount);
    return fooCallCount;
  }
}
var foo = fooFactory();
foo();

// we could use the IIFE pattern to get rid of fooFactory, and immediately define foo:

var foo = (function () {
  var fooCallCount = 0;

  return function() {
    fooCallCount += 1;
    console.log("hello " + fooCallCount);
    return fooCallCount;
  }
})();
foo();
