const express = require("express");
const bodyParser = require("body-parser");

const server = express();

server.use(bodyParser.urlencoded({extended: true}))          // to make request.body.foo work in POST/PUT requests
server.set("view engine", "ejs");      // to make response.render() work
server.use(express.static("public"));  // to look for files matching the URL in the ./public folder (useful for CSS, images, etc.)


// single GET request handler:

server.get("/", function(request, response) {
  response.render("index", { name: "World",
                             colors: ["red", "green"],
                             showMoon: false});
});


// GET + extracting values from the URL params:

server.get("/other", function(request, response) {
  response.render("index", { name: request.query.name,
                             colors: ["red", "green"],
                             showMoon: false});
});


// GET + extracting values from the URL:

server.get("/:name", function(request, response) {
  response.render("index", { name: request.params.name,
                             colors: [],
                             showMoon: true });
});


// POST + extracting values from the POST body:

server.post("/handler", function(request, response) {
  response.render("index", { name: request.body.name,
                             colors: [],
                             showMoon: true });
});


// start the server

server.listen(8080, function() {
  console.log("server started");
});


