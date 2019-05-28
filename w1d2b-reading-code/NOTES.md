## Reading Code

 - start with start.js

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



## Debugging


    1. narrow things down
          
           your toolbox:
             - read code / follow its execution
             - identify parts of code that can be ignored
             - use console.log
             - use debugger
             - add extra tests
             - add new tests that only test subsets of the code (ex. some function)
             - rewrite part of the code in a seperate file 

    
    2. understand why you are getting the result you are getting
     
          - make guesses, modify code to see if they are correct
            (if not, UNDO the changes, try again)



    once you understand the problem, the solution should be trivial, so...

    3. fix it