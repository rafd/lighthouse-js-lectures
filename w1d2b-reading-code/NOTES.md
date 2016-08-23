## Reading Code

 - scan top down
   - make note of variables defined or declared
   - make note of defined functions (but don't read into them yet)
	 - identify entry point: first line of code that "does something"
 - follow the function call paths through the program
   - if the code is well-written, the names of functions should be good enough to explain what they do and you don't need to read the function's code

 - walk through example: morse code program

## Scope

  - what is “scope”?
    - the "scope of a variable" is the "parts of the program" where the variable is valid (ie. is defined)
    - we may ask:
      - "when I define this variable, which parts of the program can access it?" 
      - ie. "what is the scope of this variable?"
    - can also ask:
      - "at this point in the program, what variables can be accessed?"
      - ie. "what is the current scope?", but, more accurately, we would say: "what is the current _context_?"
      
    - in JS:
      - functions create new contexts, so end up having a tree of contexts (can also think "boxes in boxes")
      - when a variable is declared or defined, it is available only in:
        - its current context, 
        - child contexts (ie. to functions defined inside of the function where the variable was defined)
        
	- walk through example: morse code program


## Functions as Values

 - in JS, functions are values (like numbers, or strings, or arrays...)
 
   - can be created without a name
     - ex. `function(x) { return x + 1 }` 
     - we call these "anonymous functions"
     - very useful, very common to do this
       - ex. in a `foreach`:
        ```
        someArray.forEach(function(x) {
          console.log(x);
        });
        ```
        
   - can be given a name and referred to by that name
     - ex. 
       ```
       var myFunction = function(x) { return x + 1 };
       
       var newArray = someArray.map(myFunction);
       ```
