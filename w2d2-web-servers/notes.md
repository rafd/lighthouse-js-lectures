# Intro to HTTP Servers

## What is a "server"?

  "a server is a central computer that other computers ('clients') talk to"

  ```
    Client - Server Architecture

    client
        \
       SERVER  --  client
         |
         client
  ```

  vs.

  ```
    Peer-to-Peer Architecture:

    client  --   client
          \      /
            client
  ```

## What is a "__web__" server?

Typically, "web" server means "http" server, ie., a server (see above) that can receive "HTTP Requests" and respond with "HTTP Responses" (as per the rules of HTTP)

We use "server" to refer to:
  (1) the computer that handles HTTP requests
  (2) the program on the computer that handles HTTP requests


a web server ~= a single function
                   input:  http request
                   output: http response

```
  HTTP Request  ->  [ ??? ] -> HTTP Response
```


## HTTP Review


```
    HTTP REQUEST:


     METHOD, PATH, and VERSION   |    POST / HTTP/1.1
     HEADERS                     -    Host: www.piedpiper.com
                                 |    User-Agent: Mozilla/5.0
                                 |    Accept: text/html,application/xhtml+xml
                                 |    Referer: https://duckduckgo.com/
                                 |    Cookie: __cfduid=dce7538b6bca2cf881f1f
                                 -
     BODY                        |    licenseID=string&content=string&/paramsXML=string


     - different METHODs have different rules and expectations
         - (ex. whether a BODY is allowed, or, whether the client can safely repeat the request, etc.)
         - see table: https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Summary_table)
     - HOST is the only mandatory HEADER (as of HTTP/1.1)
```

```
    HTTP RESPONSE:

       HTTP VERSION, STATUS      |    HTTP/1.1 200 OK
       HEADERS                   -    Date: Tue, 17 Jan 2017 12:37:12 GMT
                                 |    Content-Type: text/html; charset=UTF-8
                                 |    Cache-control: public, max-age=300
                                 |    Server: cloudflare-nginx
                                 |    Content-Encoding: gzip
                                 -
       BODY                      |    <!doctype html>
                                 |    <html lang="en-US">
                                 |      <head>
                                 |      <meta charset="utf-8">
                                 |      ...

      - for list of STATUSes: https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
      - all response HEADERS are optional
      - BODY is optional
```



## Creating a web server w/ javascript+node

### Using the http module

```
   the http library will:
     convert the HTTP request from text to a JS object
     convert the HTTP response object to text

   HTTP Request (TEXT)
     ->  HTTP Request (JS object)
        ->  [ your code here ]
             -> HTTP Response (JS object)
                -> HTTP Response (TEXT)
```

```
   HTTP REQUEST (Node):

     { method: 'GET',
       url: '/',
       headers: { host: 'www.piedpiper.com',
                  referer: 'https://duckduckgo.com',
                  ... }
       ... lots more ... }
```

```
   HTTP RESPONSE (Node)
      { headers: {foo: bar},
        status: 200,
        body: "...",
        ....
      }
```


see demo in ./http-server/server.js


### Using the Express library

Working directly with the http package can be tedious.
Express adds a lot of functions to make it simpler (at the cost of having to learn express)

#### Set-Up:

## Static Files
  app.set(express.static("public"));

#### Routes:

```
server.get("/:foo", function(request, response) {
  console.log(request.params.foo);
  ; ...
  response.send("...");
});
```


#### EJS

EJS lets us:
 1) use files as HTTP responses  (we refer to the files as "templates")
 2) use js inside the templates
 3) pass data to the templates

```
  npm install ejs

  ; put files in views/ folder

  ; when configuring the server
  server.set("view engine", "ejs");

  ; inside of a request:
  res.render("filename", {key: val});
```


