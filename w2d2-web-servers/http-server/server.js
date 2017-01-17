const http = require("http");

function simplify(request) {
  return {method: request.method,
          headers: request.headers,
          url: request.url};
}

const server = http.createServer(function(request, response) {
  console.log(simplify(request));
  if(request.url === "/" && request.method === "GET") {
    response.end("<h1>Hello World!</h1><form method='POST'><input/><button/></form>");
  } else if (request.url === "/" && request.method === "POST") {
    response.end("you made a post request");
  } else {
    response.statusCode = 404;
    response.end("Unknown Path");
  }
});

server.listen(8080, function() {
  console.log("server started")
});
