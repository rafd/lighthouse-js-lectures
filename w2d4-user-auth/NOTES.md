# User Auth

  - "auth":
    - authentication: "this person is actually Bob" (this is what we're focusing on today)
    - authorization: "Bob is allowed to see this resource" 

  - problem: http is stateless, but want to have "user logins"

  - solution: cookies
    - how they work
      - in the Cookie header of an HTTP response, the server instructs the browser to remember some key:value pairs
      - in the Cookie header of all subsequent HTTP requests, the browser will include those key:value pairs 
    - how they solve the state problem
      - can now "keep track" of a user, b/c the browser can remind us in each request who the user was

  - DEMO: user logins with cookies (see `0-server-cookies.js`)

  - SECURITY ISSUE
    - bad: save password plaintext 
    - bad: encrypt the password (should hash)
      - if db was leaked, "secret" for encrypting was probably leaked as well
    - bad: hash the password with MD5 (or similar)
      - too fast: allows for brute-force guessing of password
    - good: hash the password (with bcrypt)
      - "slow" so that hashes can't be brute-forced in a reasonable time (hundreds of years), evet with many CPUs or GPUs

    - note: you must use the libraries way of comparing hashes (vs. just doing bcrypt(x) === hash) b/c of timing attacks
      https://en.wikipedia.org/wiki/Timing_attack

      
  - DEMO: use bcrypt (see `1-server-cookies-hash-password.js`)

  - SECURITY ISSUE
    - user can see data in cookie and modify, becoming any other user
    - an external attacker could also manfucture the cookie and set the user_id to be whatever they want
    - see `0-server-cookie-curl-hax.sh`
    - 3 solutions:
      - 1: encrypt the cookie 
        - encrypt the user_id when saving to cookie, decrypt when receiving cookie
        - due to how encryption works, user cannot manufacture or manipulate the encrypted value in any way that would still make sense to the server
        - recommended algo: AES256 
      - 2: sign the cookie
        - in cookie, save raw value (ex. user_id: 5) and a hashed version of the value
        - server checks that hash(given data) == given hash
        - user can manipulate the raw value, but, due to how hashing works, user cannot manufacture or manipulate the hash part
        - tradeoffs
          - is faster to check than encryption and cookie is smaller than encryption
          - but, user can see the data (which sometimes you don't want)
      - 3: server-side session storage
         - store a long randomly generated session-id in a cookie
         - in a database on server, keep track of session-id -> user_id
         - tradeoffs
          - smaller cookie size than (1) or (2)
          - depending on db set-up could be as fast as signing
          - easy to invalidate specific users' session-ids
          - need extra infrastructure (the session db), which may not be worth the hassle for some projects

    - when to use plain cookies?
      - maybe for: 
        - language selection
        - shopping cart 
        - "remember me" setting
        - (stuff that it's okay if the user manipulates manually)

  - DEMO: use cookie-session package (see `2-server-encrypted-cookies.js`)

  - SECURITY ISSUE
     - problem: man-in-the-middle stealing cookies
       - HTTP is plain-text
       - man-in-the-middle (we know NSA, etc. do this; trivial in a coffee shop w/o encrypted wifi)
       - firesheep: https://en.wikipedia.org/wiki/Firesheep
     - solution: HTTPS (End-to-End Encryption)
       - need to get a certificate from a certificate authority 
       - potential solutions: Lets Encrypt, Cloudflare
       - also: make sure your cookies are set as SecureOnly and HTTPonly 
     - crypto Aside: Public Key Crypto

  - SECURITY ISSUE
    - problem: a user's cookie could be manually stolen from their computer
    - solution:
      - generally, a hard problem
      - make cookies only last a short time (ex. 10 minutes)
      - rotate cookies frequently (on every request, give a new cookie that expires soon)
      - check if IP / browser / etc. match what is known, ask for re-login if data doesn't match
      - give user a way to "force log out of all devices"

  - SECURITY ISSUE (STRETCH)
    - problem: CSRF 
    - https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)


