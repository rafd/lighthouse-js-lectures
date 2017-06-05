# Ruby


  OOP

    Ruby: 
      - designed w/ OOP in mind
      - community culture of OOP
        - organize code w/ classes + objects
        - inheritance
    JS:
      - not designed w/ any specific paradigm
      - mixed culture (unstructured, functional, prototypical OOP, class OOP w/ ES6)
           

  Methods vs. Functions

    Ruby: 
      - has first-class functions ("lambdas") but rarely/never used
      - instead use "methods"
        - can't be passed around
        - indistinguishable from variables
        - brackets optional
          - Object.foo is same as Object.foo()
        - check arity (possible to make optional args)
        - implicit return (always returns a value)
        - can take blocks (similar in purpose to "callbacks")
          ** EXAMPLES **


  Variables and Scope

    - no var, let, const
    - variables implicitly declared, scoped based on name:
      - lowercase -> local  (ie. block scope, not function scope)
      - UPPERCASE -> constant, global
      - $dollar -> global
      - @at_sign -> instance 
      - @@double-at -> class


  Concurrency

    JS 
      - culture of async, non-blocking
      - use callbacks, promises, etc.

    Ruby
      - culture of sync, blocking
      - can just do: `results = db.query("...")`


  Syntax and Naming Conventions

    - generally, very similar: http://agentcooper.io/js-ruby-comparison/
    - brackets optional
    - no semicolons
    - foo? indicates boolean return
    - foo! indicate potential side-effects or exceptions


  Symbols

    :foo
    used to represent a non-numeric repeated value 
       (where you don't care about the individual letters, as in a string)
    ex. :male :female
    often used in hashes
      {:name => "Bob"
       :email => "bob@example.com"}

       though, new shortcut syntax:
         {name: "Bob"
          email: "bob@example.com"}

    technical explanation:
      each keyword represents some internal number, but, same value for same keyword (+ does not store each letter)
        :hello :hello :hello :hello     (1x :hello memory allocated)

      whereas w/ strings, every string is its own objects, allocates new memory
        "hello" "hello" "hello" "hello" "hello"  (5x "hello" memory allocated)
      
      


  Enumerable + Array + Hash

    - Array and Hash inherit from Enumerable
    - lots of useful methods for working with collections:
      .each
      .map
      .find
      .filter
      .select
      .reduce
      ...



  Ecosystem:

    node somefile.js       ruby somefile.js
    node (to start repl)   irb
    "package"              "gem"
    npm install            gem install / bundle install
    console.log            puts / p 
