# CRUD with Express


## CRUD over HTTP


              REST convention        

  C  create   POST   /songs/            (with form data)
  R  read     GET    /songs/123    
  U  update   PUT    /songs/123         (with form data)
              POST   /songs/123         (with form data)    ^   
  D  delete   DELETE /songs/123
              POST   /songs/123/delete                      ^

  ^ doing this for now b/c browser can only make GET and POST requests 


  GET is meant for: "requests that do not change state on the server"
  POST is meant for: "requests that do make changes"


## Making Requests with the Browser

enter URL in address bar    ->   GET
refresh page                ->   GET or POST
click a link                ->   GET
click a bookmark            ->   GET
submit a form               ->   GET or POST
javascript ajax             ->   GET, POST, PUT, DELETE, etc.


<form method="POST" action="/the/url">
  <input type="text" name="field1">
  <input type="text" name="field2">
</form>

for POST, the above form would send the following in the BODY of the request:

   field1=value1&field2=value2

for GET, the above form would send the following in the URL of the request:

   /the/url/?field1=value1&field2=value2

to help us parse these into a useable form, we use the 'body-parser' package,
which will convert the above into an object:

  { field1: "value1",
    field2: "value2" }


## Accessing Request Data in Express

GET "/songs/:id"             ->   req.params.id
GET "/songs/?q=whatever"     ->   req.query.q
POST "/songs" (+ form data)  ->   req.body


##  "Post then Redirect" Pattern

https://en.wikipedia.org/wiki/Post/Redirect/Get

could do:
   
   browser            server

   GET /foo   --------> get stuff from db
              <-------- 200 response with html

   POST /foo  --------> change stuff in db
              <-------- 200 response with html

but, if the user refreshes on the final page, the browser will:
   - show a "are you sure you want to do this?" popup (often confuses the user)
   - if user clicks "Continue", the browser will re-make the POST request, which is rarely what we want  
        (ex. it could submit a purchase a second time, or, create a comment a second time, etc.) 


instead, we always return a redirect from a POST request:

   browser            server

   GET /foo   --------> get stuff from db
              <-------- 200 response with html

   POST /foo  --------> change stuff in db
              <-------- 302 response with "redirect to /foo"

   GET /foo   --------> get stuff from db
              <-------- 200 response with html


## Using DevTools

- to open: Right-Click page -> Inspect -> Go to Network Tab
- DevTools only "records" the requests/responses when DevTools is open
- DevTools will prevent the "Do you want to resubmit a POST requests" warning
- Usually want "Preserve Log" (but will ocassionally want to to "Clear")


