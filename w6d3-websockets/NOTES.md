# PUSH

sometimes, we want the server to be able to 'push' a message to the client (immediately, based on some event)

ex. chat app, email client, game, screen-share


## PUSH with HTTP

  HTTP is a request-response protocol, so, the only way the server can send a message to the client is if the client makes the request first

  ...but, there are ways to implement "push" with HTTP:

  - POLLING

    - client asks for an update every X seconds (using ajax)

    - note:
      - most of the time get a response of "nothing new"
      - overhead of having to reconnect for every request + send headers
      - delay of up to X seconds + connection delay to get new data
      - for many applications, this is good enough! 


  - LONG POLLING

    - client asks for an update (ie. ajax request)
      - server keeps connection open until it has something to send (or some time limit reached)
      - server sends a response
    - client receives response
    - client immediately asks for an update again (ie. ajax request)

    - note:
       - less overhead than regular polling (b/c reconnect every ~60sec rather than ~1sec)
       - much more complex to implement than regular polling


## Aside: UDP? TCP?

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


## WEBSOCKETS

  - ws is another protocol that browsers understand
    - similarities to HTTP:
      - text-based protocol (ie. not binary)
      - reliable message send/receive (ie. if message is received, it will be complete; messages arrive in order)
      - client : server architecture (many clients, one server)
    - differences from HTTP: 
      - bidirectional   (vs. HTTP: request / response)
        - after client connects to server:
          - can send messages client->server, server->client
          - both sides can start sending data at any time
      - persistent connection   (vs. HTTP: disconnect after every message)
        - ie. client connects, connection kept open
      - stateful (vs HTTP: stateless, every request can be treated independently)
        - have a unique connection object for each connected client (persists for many messages)
        - only need to check identity once (on connection), not on every message
      - up to you to come up with names/structure for events (vs HTTP: methods, urls, status codes, REST)
        - typically send JSON back and forth (manually using JSON.stringify and JSON.parse)


  - benefits over polling/long-polling with ajax:

    - lower latency (ie. less delay between message send and message receive)
       - w/ HTTP, keep having to make/drop connections (this introduces a delay)
       - w/ ws, connect once, keep connection open

    - higher bandwidth efficiency 
       - w/ HTTP, headers + cookies on every message
       - w/ ws, ~0 message overhead

    - nicer API for dealing with "sending data from one client to other clients" than HTTP

  when should I use websockets?
    - websockets is ideal for:
      - lots of data (high bandwith)
      - minimal delay (low latency)
    - real-time game -> websockets!
    - chat client -> polling/long-polling is fine, websockets ok too

  - websockets api:
    - browser:
      - https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API
      - well supported: http://caniuse.com/#search=websocket
    - server:
      - https://github.com/websockets/ws

  - socket.io  ("jquery for websockets")
    - http://socket.io/
    - cross-browser API
    - takes care of "rooms"
    - takes care of JSON conversion
    - automatic fallback to ajax (long polling / polling)


## Aside: WEBRTC

  https://developer.mozilla.org/en-US/docs/Web/Guide/API/WebRTC

  another "protocol"!

  WebRTC               WebSockets            HTTP
    API over UDP         API over TCP          API over TCP
    binary               text                  text
    unreliable*          reliable              reliable
    peer-to-peer (!)     client:server         client:server

  - perfect for video/audio streaming
  - also used for peer-to-peer chat
  - check this out: torrents in browser: https://webtorrent.io/  

  https://simplewebrtc.com/

