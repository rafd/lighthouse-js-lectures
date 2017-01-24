# jQuery

## Intro [20m]

### Why does it exist?

 - a nicer API ("syntactic sugar") to do:
   - DOM traversal and manipulation
   - event handling
   - ajax
   - animations
 - it used to be about cross browser compatibility
     (not much of an issue now)

### How much additional behavior does it add to the browser?

  - none; it works within the constraints of what the browser API can do for usj

### Library or framework? Why?

  - Library
    - frameworks provide a skeleton (or dictate a structure) for your project)
    - libraries just provide some self-contained functions
    - see: http://stackoverflow.com/questions/148747/what-is-the-difference-between-a-framework-and-a-library#148759

### What is `$` or `jQuery` in code exactly? How does it work?

  - `$` === `jQuery`
  - can do a lot of things with it:
    - search for DOM elements:
       `$("a")`
    - create DOM elements:
       `$("<a>")`
    - delay a function until document is ready:
       `$(function() {
            ...
            ...
            ...
        });`

       ===

       $(document).on("ready", function() {
            ....
            ....
            ....
            ....
       })
    - turn a DOM element into a jQuery object
       `$(document)`
    - turn an array/hash into a jQuery object (rare)
        `$([1,2,3])`


### Why is it important to learn / use jQuery ?

  - Because of its prevalence
      https://libscore.com


## House-keeping / Expectations [5m]

- The jQuery docs are quite good, you should be using them a lot

- The API has alternative ways of doing things (eg `.on('click')` vs `click()`) and you should not get hung up on learning the entire surface area for jQuery. The goal is to learn it enough and get comfortable with the process of learning it (yes, this is a recurring theme!)


## Demo 1: Event Handling [20m]

Demo click event handling and console logging the event object to see that it is not the original event but has the `originalEvent`.

Create a new element using `$` dynamically and then append it to the DOM.

- Start:  <https://jsfiddle.net/encw11fk/12/>
- End: <https://jsfiddle.net/encw11fk/11/>


## Demo 2: Realistic Demo [15m]

Builds on the previous one and shows a more realistic application.
 - JSON data-structure
 - loop over and create UI elements

- Start: <https://jsfiddle.net/x41fbsaq/5/>
- End: <https://jsfiddle.net/x41fbsaq/4/>


### SECURITY ALERT!

### UNSAFE:
  ```javascript
  $(`${userContent}`);

  $(userContent).

  $("...").html(userContent);

  $("...").append(userContent);

  ```


### SAFE:

  ```javascript
  $("...").text(userContent);

  $(`${escape(userContent)}`);

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  ```

## jQuery Alternatives & Why Size Matters™ [2-5m]

jQuery does a lot and is a non-trivial addition to your project.

A lot of the jQuery code is compatibility code for older browsers.

Alternatives:

- Zepto: http://zeptojs.com/
- Cash: http://kenwheeler.github.io/cash/
- VanillaJS: http://vanilla-js.com/

The size of jQuery is no longer much of an issue (30kb is about the size of a 50x50px JPG image)

Also worth knowing:

  - cdn
    - various sites on the internet host popular libaries for you:
      - https://www.jsdelivr.com/
      - https://cdnjs.com/
      - https://unpkg.com/
      - https://www.bootstrapcdn.com/
      - https://developers.google.com/speed/libraries/

  - subresource integrity
    - if getting scripts from a CDN, there is a risk of the provider being compromised and to start sending your users other files
    - solution:
        https://hacks.mozilla.org/2015/09/subresource-integrity-in-firefox-43/

  - minification
     - a process of compressing your JS code by removing whitespace and renaming variables
     - in dev, use the normal version (so you can debug)
     - in prod, use the .min.js version

  - gzip
    - a compression algorithm that browsers understand
    - similar to how "zip" works
    - need to configure your server to use it


