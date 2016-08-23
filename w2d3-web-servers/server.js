const http = require("http");

const PORT = 4567;

function requestHandler(request, response) {
  console.log(request);
  if(request.url === "/data" && request.method === "GET") {
    response.setHeader('Content-Type', 'application/json');
    response.end("{\"foo\":1}");
  } else {
    response.setHeader('Content-Type', 'text/html');
    var greeting = "hello world";
    response.end(ejs("greeting.html", {name: "Bob"}));
  }
}

var server = http.createServer(requestHandler);

server.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}`);
});
