
## Functions as Values

 - in JS, functions are values (like numbers, or strings, or arrays...)
 
   - can be created without a name
     - ex. `function(x) { return x + 1 }`
     - we call these functions "anonymous functions"
  
   - can be assigned to a variable (giving it a name) and then referred to by that name

     - ex.
       ```
       var myFunction = function(x) { return x + 1 };

       var newArray = someArray.map(myFunction);
       ```



## Functions that Receive Functions


 - Why? 
   - Can create useful functions that can do different things depending on what you need from them.
   - Very very common in javascript
   - The function that is passed to some function is often called "a callback"
      - there's nothing different about the callback function
      - "a function is a function, but when passed to another function, we also call it a callback"
      - "a man is just a man, but when he works for a company, we also call him an employee"

   - ex. in a `forEach`:
      ```
      someArray.forEach(function(x) {
        console.log(x);
      });
      ```

Working with common functions that receive functions: see arrays.md

Making our own function that receives functions: see reverse.md


## Functions that return functions


A function that returns a function, that returns 5:

```
var parent = function() {
  var child = function () {
      return 5;
  };
  return child;
}

parent      // [Function parent]
parent()    // [Function child]
parent()()  // 5

c = parent()
c()         // 5
```



Now with `child()` taking a variable:


```
var parent = function() {
  var child = function (x) {
      return x;
  };
  return child;
}

parent      // [Function parent]
parent()    // [Function child]
parent()(10)  // 10

c = parent()
c(10)         // 10
```


Now with `child()` using a variable from `parent()`:


```
var parent = function() {
  var a = 100;
  var child = function (x) {
      return x + a;
  };
  return child;
}

parent      // [Function parent]
parent()    // [Function child]
parent()(3)  // 103

c = parent()
c(3)         // 103
```

`child()` remembered the value of `a` !!!

We say that "it closed over" the value of a; or, it "created a closure".

See more on closures in `clojures.js` 