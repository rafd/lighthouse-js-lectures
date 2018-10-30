= Programming Paradigms

  - "style" of programming
  - paradigm =/= language
    - most programming languages can support code written in a variety of styles
    - most of the programming languages in the examples below support multiple paradigms, but are listed along in the category of their dominant paradigm
  - often a programs may combine aspects of different styles
  - below are a few common "paradigms", but, the list is not exhaustive
    - see: https://en.wikipedia.org/wiki/Programming_paradigm


  Imperative Programming

    - code describes computations that change state
    - composed of "statements" (code that has side effects)

    Procedural Programming

     - imperative, but with procedures ("functions")

       declared functions

       code
       code calls function
       code

     - ex.
         Basic
         Fortran
         Cobol
         C

         PHP
         Python
         Javascript

    Object-Oriented Programming (OOP)

     - code describes objects (data + methods) and their interactions
     - two common types:
         - class-based (Ruby, almost all OOP languages)
            - class = blueprint
            - instance = actual objects
         - prototype-based (Javascript, Lua)
            -
     - ex.
         Java
         C++
         C#
         Ruby
         ObjectiveC
         Swift


  Declarative Programming

    - code describes logic without explicitly describing control flow ("order of operations")
    - "what" vs "how"
    - composed mostly of "expressions" (code that evaluates to a value, usually without side effects)
    - ex.
        Regular Expressions
        Excel
        SQL (db queries)
        Datalog (db queries)
        Prolog (logic programming)
        Modelica (modeling physical systems)


    Functional Programming

      - avoid state, avoid changing state, avoid "side effects"
      - composed mostly of pure functions
         - functions that only depend on their params and constants, and only return values
         - they have not side effects
         - ex. pure function:

           function add(x, y) {
             return x + y;
           }

         - ex. impure function

           a = 10;
           function add(x) {
              a = a + x;
           }

      - bonus of using expressions + pure functions:
        - referential transparency (an expression can be replaced with its value)

      - don't have "variables", instead have "bindings" (which can't change, aka "immutable")
      - also, lots of passing functions around as objects (prerequisite: having functions as first-class objects)

      - ex.
          Haskell (pure)
          Clojure
          F#
          Scala
          Elm
          Elixir


  Visual Programming

    - does not use text as representation of code
    - often have nodes w/ inputs outputs (~ functions)

    - ex.
        Scratch
        SimuLink
        LabView
        Lego Mindstorms
        Various Flow-based Languages








