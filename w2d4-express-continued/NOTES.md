# Relative and Absolute URLS

given you are at:
  http://localhost:8080/foo/bar

redirect baz
  -> http://localhost:8080/foo/baz

redirect /baz                       * most common *
  -> http://localhost:8080/baz

redirect http://baz                 "absolute URL" (b/c it contains the protocol)
  -> http://baz

redirect ../baz
  -> http://localhost:8080/baz


Typically, relative URLs are used, because we don't want to hardcode the host ("localhost:8080") into our app.


# GET vs POST (vs. PUT)

You should understand and remember the following table: (for: GET, POST, PUT, DELETE)

  https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Summary_table


When does a browser create GET and POST requests?

  GET:
    - user enters a path into the url bar
    - user clicks on a link
    - user refreshes a page
    - initiated by js (aka "ajax", "xhr")
    - in response to a http 301/302 response from the server
    - to fetch resources indicated by an html file
         (images, javascript files, css files)
    - user submits a form (with method = GET)

  POST:
    - initiated by js (aka "ajax", "xhr")
    - user submits a form (with method = POST)
    - user refreshes a page retrieved by a POST request

  PUT, DELETE, etc:
    - initiated by js (aka "ajax, "xhr")

# Links vs Forms

Links
  href -> url for the HTTP request (always GET)

Forms
  action -> url for the HTTP request
  method -> GET or POST

  (forms most often used for POST; GET only in certain situation, ex. Search fields)


# Forms -> HTTP Requests

## Form with method = GET

<form action="/some/url" method="GET">
  <input type="text" name="email">
  <input type="password" name="password">
  <button type="submit">
</form>

             V--  "query params" (part of URL) --V

GET /some/url?email=bob@gmail.com&password=whatever HTTP/1.1
Host: localhost:8080


## Form with method = POST

<form action="/some/url" method="POST">
  <input type="text" name="email">
  <input type="password" name="password">
  <button type="submit">
</form>

POST /some/url HTTP/1.1
Host: localhost:8080
Content-Type: application/x-www-form-urlencoded
Content-Length: 37

email=bob@gmail.com&password=whatever

^----- form data" (in the body) -----^


# Accessing Request Data in Express

                          route pattern    url           form data     accessing the data

from the url pattern       "/user/:id"    /user/5                      req.params.id
from url query params      "/user/"       /user/?id=5                  req.query.id
from form data             "/user/"       /user           id=5         req.body.id


# Render vs Redirect

res.render("template") returns a "200 OK" HTTP response, with the template as the HTTP response body

res.redirect("url") returns a "302 Found" HTTP response, with the url in the Location HTTP header

important:
  redirect() results in an HTTP response, just like render()

the different types of responses cause the browser to do different things:

200 -> browser attempts to render the response body (typically HTML)
302 -> browser issues a GET request to the url in the Location header

# Chrome Dev Tools

 use the Network Tab

 tips:
   - [x] preserve log
   - [x] disable cache
   - clear the log before testing something (to make it easier)

