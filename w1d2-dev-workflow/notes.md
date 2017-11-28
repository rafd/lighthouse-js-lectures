# General Principles of Tackling Programming Problems


## understand the problem

  - if the requirements don't make sense, ask questions until they do
  - you don't need to understand the solution immediately, but you should understand the problem
  - in the real world, requirements are often unclear and change over time


## break down the problem

  - what are the inputs? (what types of things? how many? all at once, or over a period?)
  - what are the outputs? (what types of things? how many? all at once?)
  - can you break the problem down into any obvious steps? or, into a simpler problem?
    (this is non-trivial, and you will get better at it with experience)


## start with what you know

  - don't worry about immediately meeting all requirements
  - identify something you know that could solve part of the problem, and do that


## check that things are working as you expect
 
 - use console.log to check if intermediate values are what you expect
   (but get rid of the console.logs when you don't need them)
 - you should always completely understand your code


## when your code is broken, understand before fixing

  - do not just start changing code
    (at this stage, it is very likely your fixes will be incorrect, and may just break more things)
  - re-read and add console.logs to understand exactly why you get the behaviour you expect
  - you can make guesses as to what is wrong, but also check if your guesses are true
  - once you understand why things aren't working, the correct solution should become clear


## when it's working, refactor 

  - when you have something working, take a moment to make your code "simpler" / "cleaner"
  - "simpler" == easier to understand (not necessarily shorter)
  - remove unnecessary comments, variables or console.logs
  - review your code formatting (ie. indentation, spacing)
  - review your variable names
  - add comments for non-obvious code, or better yet, extract that code into a function with a clear name 


## identify a next goal and work on it

  - identify something that's missing and that you know how to do
  - it's totally fine to temporarily skip requirements
  - avoid trying to solve the entire problem at once
  - keep a written-down list of missing requirements if you need


## always move from working to working

 - try to spend as little time with code "broken", ie. giving an error
   (it's fine if it's "incorrect", ie. running, but not fulfulling all requirements)


## get stuff onto the screen

 - it's much easier to program with some code in front of you than in your head


## use the REPL to experiment with new stuff

  - use `node` to check how functions behave independently from the rest of your program
    (it's simpler than trying to immediately make the function behave with the rest of your program)
  - alternatively, create a new file to test out some functionality


## don't worry about efficiency or speed

  - in general: "make it work, make it clear, then, only if necessary, make it fast"
  - "efficiency" is rarely a concern for it's own sake, usually, you just care that it "feels fast enough for your user"
  - most of the time, the most naive inefficient solution will be good enough
  - only *some parts* of a program will actually lead to your *entire program* feeling "slow"
  - it's very hard to know ahead-of-time which parts are going to be the "slow ones"
  - optimizing for efficiency or speed as you code is a waste of time, because you end up optimizing parts that don't need to be optimized (and, optimization usually makes things less clear)
