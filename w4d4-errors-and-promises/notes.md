
# Promises

promises allow for an alternative way of writing complex asynchronous code

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

see promises.js for examples



# Errors

https://www.joyent.com/node-js/production/design/errors


we distinguish 2 types of errors:

 - programmer errors 
   - program bugs due to incorrect code
   - probably want to crash the program (and maybe restart it)
   - fix it by fixing the code

 - operational errors
   - errors resulting from situation that can't be fixed
   - ex. request failed b/c lost network connection, out of memory, etc.
   - fix by... depends on the error and situation, could:
     - retry
     - reconnect
     - log and crash
     - log and move on
     - pass the error on to elsewhere
     - ...
   

different ways of doing errors in js
  see errors.js

  


