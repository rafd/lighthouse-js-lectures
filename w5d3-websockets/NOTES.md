# PUSH

sometimes, we want the server to be able to 'push' a message to the client (immediately, based on some event)

ex. chat app, email client, game, screen-share


## PUSH with HTTP

  HTTP is a request-response protocol, so, the only way the server can send a message to the client is if the client makes the request first

  ...but, there are ways to implement "push" with HTTP:

  - POLLING

    - client asks for an update every ~1 sec (using ajax)

  - LONG POLLING

    - client asks for an update (ie. ajax request)
      - server keeps connection open until it has something to send
      - server sends a response
    - client receives response
    - client immediately asks for an update again (ie. ajax request)


## WEBSOCKETS

  - ws is another protocol that browsers understand
    - text-based protocol (ie. not binary)
    - guaranteed message send/receive
    - bidirectional
      - (can send messages client->server, server->client)
      - (both sides can start sending data at any time)
    - persistent connection
      - (ie. client connects, connection kept open)
    - client/server
      - client knows of one server
      - server manages receive/sending messages between many clients

```
         <-> CLIENT
  SERVER <-> CLIENT
         <-> CLIENT
```

  - benefits over polling/long-polling with ajax:

    - less connection overhead
       - w/ HTTP, keep having to make/drop connections (this introduces a delay)
       - w/ ws, connect once, keep connection open
       - = better ping

    - less message overhead
       - w/ HTTP, headers + cookies on every message
       - w/ ws, ~0 message overhead
       - = better ping, less bandwidth

    - slightly nicer API

  - websockets is ideal for:
    - lots of data (high bandwith)
    - minimal delay (low ping, low latency)

  - real-time game -> websockets!
  - chat client -> polling/long-polling is fine, websockets ok too

  - up to you to come up with names for events
    - typically send JSON back and forth (manually using JSON.stringify and JSON.parse)

  - websockets api:
    - https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API
    - well supported: http://caniuse.com/#search=websocket

  - socket.io  ("jquery for websockets")
    - http://socket.io/
    - cross-browser API
    - takes care of "rooms"
    - takes care of JSON conversion
    - automatic fallback to ajax (long polling / polling)


## WEBRTC

  https://developer.mozilla.org/en-US/docs/Web/Guide/API/WebRTC

  another "protocol"!

  - API over UDP   (whereas WS is a text API over TCP)
  - peer-to-peer (!!!)
  - binary
  - can lose data, can be out of order (depending on network)

  - perfect for video/audio streaming
  - also used for secure chat

  https://simplewebrtc.com/


## UDP? TCP?

  https://en.wikipedia.org/wiki/Internet_protocol_suite

   ```
   HTTP  WS  WebRTC     <- available to JavaScript in the browser
     \   /   /
      TCP   UDP         <- available to apps w/ direct access to OS
        \  /
         IP
  ```

  ```
  HTTP      text      request/response   reliable (delivery and order)   browser JS API  

  WS        text      bidirectional      reliable (delivery and order)   browser JS API   

  WebRTC    binary    bidirectional                                      browser JS API 

  TCP       binary    bidirectional      reliable (delivery and order)                 

  UDP       binary    bidirectional                                                   

  IP        binary    bidirectional                                                  
  ```

Further Reading:
  https://en.wikipedia.org/wiki/OSI_model
  https://en.wikipedia.org/wiki/Internet_protocol_suite
