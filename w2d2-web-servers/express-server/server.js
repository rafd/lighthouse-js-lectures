const express = require("express");
const server = express();

server.set("view engine", "ejs");
server.use(express.static("public"));

server.get("/", function(request, response) {
  response.render("index", { name: "World",
                             colors: ["red", "green"],
                             showMoon: false});
});

server.get("/:name", function(request, response) {
  response.render("index",{ name: request.params.name,
                            colors: [],
                            showMoon: true });
});

server.post("/", function(request, response) {
  response.send("you made a post request");
});

server.listen(8080, function() {
  console.log("server started");
});


