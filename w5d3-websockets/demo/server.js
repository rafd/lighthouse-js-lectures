const ws = require('ws');
const fs = require('fs');
const http = require('http');

// HTTP SERVER (for static files)

http.createServer(function(request, response) {
  file = request.url == "/" ? "index.html" : request.url;
  fs.readFile("./public/"+file, "binary", function(err, content) {
    response.end(content);
  });
}).listen(9997);

// WEBSOCKET SERVER

const server = new ws.Server({port: 4000});

const drawEvents = [];

server.on('connection', (client, req) => {
  console.log('connected');

  // if need to check user authentication, can access cookie via req.headers.cookie 

  // helper function to broadcast messages 
  //  ie. send to all other clients except this one
  const broadcast = (message) => {
    server.clients.forEach((c) => {
      if(c != client) {
        c.send(JSON.stringify(message));
      }
    });
  }

  client.on('message', (rawMessage) => {
    const message = JSON.parse(rawMessage);

    switch(message.cmd) {
      case 'draw':
        drawEvents.push(message);
        broadcast(message);
        break;
      case 'register':
        client.color = message.data.color;
        console.log("registered", client.color);

        // send all events that we've received so far to the new client
        drawEvents.forEach((e) => {
          client.send(JSON.stringify(e));
        });
        break;
    }
  });

  client.on('close', () => {
    console.log('disconnected', client.color);
  });

});
