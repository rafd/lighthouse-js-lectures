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

// we can also create another one:

foo2 = fooFactory();
foo2(); // "hello 1"
foo(); // "hello 3"  (continuing from before)

// whenever you have a function that references a value defined outside of it
// the function "remembers" (keeps a reference) to that variable
// this function is called "a closure" ("we have created a closure")
// we also say: "this function closes-over the value of variable x"

// in our example, foo remembers the value of fooCallCount, even after fooFactory has finished being invoked

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

// you have probably created closures without thinking about it; now, you can do it on purpose
// closures are often used to limit the scope of variables (ie. protect them from being changed by other parts of the program)
// when working with multiple files, we frequently take advantage of closures (more about that tomorrow)
