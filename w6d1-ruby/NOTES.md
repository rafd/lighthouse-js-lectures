# Ruby

   Intro:
    - generally, very similar to JS: http://agentcooper.io/js-ruby-comparison/
    - have "strings", numbers (123), arrays [ ], hashes { }
    - but...
        - designed w/ OOP in mind
          - organize code w/ classes + objects
          - whereas JS is more "anything goes" (unstructured, functional, prototypical OOP, class OOP w/ ES6)
        - functions -> methods
        - new data type: :symbol
        - ruby community prefers: synchronous vs asynchronous
        - ...
  

  Docs:
    https://ruby-doc.org/core-2.4.2/
    http://devdocs.io/ruby/
    https://github.com/airbnb/ruby


  Ecosystem:

    node somefile.js       ruby somefile.rb
    node (to start repl)   irb
    "package"              "gem"
    npm install            gem install / bundle install
    console.log            puts (for messages to user) / p (for debugging)


  Syntax and Naming Conventions

    - brackets optional
    - no semicolons
    - snake_case (not camelCase)
    - foo? indicates boolean return (by convention)
    - foo! indicates side-effects or exceptions (by convention) or "force something"


  Variables and Scope

    - no var, let, const
    - variables implicitly declared, scoped based on name:
      - lowercase -> local variable (ie. block scope, not function scope) (can't pass between files)
      - Uppercase, UPPERCASE -> constant (also global) (includes Classes)
      - $dollar -> global variable
      - @at_sign -> instance variable
      - @@double-at -> class variable


  Working with Libraries and Multiple Files

    Ruby:
      require "library"           # for gems / libraries

      require_relative "foo.rb"   # for files

     
      no need to "export" like in JS
      require_relative "pulls in" the entire file, @instance_variables, $globals, CONSTANTS accessible



  Hashes  (aka Maps)  (similar to Objects in JS)

    users = [{:name => "Alice",
              :email => "alice@example.com},
             {:name => "Bob"
              :email => "bob@example.com"}]

    users[0][:name]   # "Alice"

    also shortcut syntax:


    users = [{name: "Alice",
              email: "alice@example.com},
             {name: "Bob"
              email: "bob@example.com"}]


     in JS, can only map string : anything
     in Ruby, can do  anything : anything

      grid = { [0,1] => "X",
               [0,2] => nil,
               [0,3] => "O" }

      grid[[0,1]]   # "X"

      grid[[0,6]] = "O"


  Symbols

    new data type

    :foo

    used to represent a non-numeric repeated value 
       (where you don't care about the individual letters, as in a string)

       users = [{ name: "Alice",
                  status: :online }
                { name: "Bob",
                  status: :busy }]


        users.select do |user|
          user[:status] == :online
        end


      ex. 
        gender         :male, :female, :other
        order-status   :packaging, :out-for-delivery, :delivered, :cancelled



    technical explanation:
      each keyword represents some internal number, but, same value for same keyword (+ does not store each letter)
        :hello :hello :hello :hello     (1x :hello memory allocated)

      whereas w/ strings, every string is its own objects, allocates new memory
        "hello" "hello" "hello" "hello" "hello"  (5x "hello" memory allocated)



  Enumerable 

    - Array and Hash inherit from Enumerable
    - lots of useful methods for working with collections:
      .each
      .map
      .find
      .filter
      .select
      .reduce
      ...


  Methods vs. Functions

    Ruby: 
      - has first-class functions ("lambdas") but rarely/never used
      - instead use "methods"
        - can't be passed around
          - can't refer to a method, can just define or call
        - methods must be defined before being used
        - brackets optional
          - Object.foo is same as Object.foo()
        - check arity (possible to make optional args)
        - implicit return (always returns a value)
        - can take blocks (similar in purpose to "callbacks")
          ** EXAMPLES **

        def square(x)
          x * x
        end

        square 2      //calling it
        square(2)     //calling it

        square()    // arity error
        square(2,3) // arity error



        class BankAccount
          def balance
            1000
          end
        end

        s = BankAccount.new
        s.balance

        
     Blocks
       (Ruby's solution to "passing code" into a method)
          
        in JS:
        [1,2,3,4,5].map((x) => {
           return x * 2;
        });

        in Ruby:

        [1,2,3,4,5].map { |x| x * 2 }

        [1,2,3,4,5].map do |x|
            x * 2
        end



  Concurrency

    JS 
      - culture of async, non-blocking
      - use callbacks, promises, etc.

      
         http.request("...", (result) => {  
           console.log(result); 
         })
         console.log("something else"); // prints first

    Ruby
      - culture of sync, blocking

        result = http.request("...");   # "blocks" (ie. waits until this command is finished before moving on) 
        p result


    synchronous is typically much simpler to understand and to write
      "callback hell" in js is a problem

    but, can run into performance issues with the synchronous way 
       b/c the program can only do one thing at a time, 
       and, it must wait for long-running things to finish
       (ex. in a web server, if a db query in one route takes a long time, no other requests can be handled)
       
       ...in reality, more subtle than "sync == bad performance at scale"
         "synchronous" is more about syntax, way of thinking
         possible to scale "synchronous" (ex. via launching multiple ruby processes)
         possible for a language to allow writing "synchronous looking code" that is actually async
            (ex. promises in js,   async/await in js)
