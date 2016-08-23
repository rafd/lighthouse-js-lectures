# Web Security

OWASP Top 10

https://www.owasp.org/index.php/Top_10_2013-Top_10

authentication: verifying identity

authorization: verifying permission


##1 - Injection

Passing "untrusted data" to an interepreter, ex: when creating a database query.

Ex. ``var query = "SELECT * FROM accounts WHERE id=" + req.params.id;``

Solution:

  1. use the parametrized API
  2. if can't do 1, escape special characters manually


##2 - Broken Auth / Session Management

 - not storing sensitive data properly (ex. passwords) (use bcrypt!)
 - weak account management functions (ex. recover password)
 - session ids don't timeout
 - session ids exposed via URLs
 - session ids aren't rotated
 - passwords, session ids, other credentials sent over unencrypted connection

https://www.npmjs.com/package/express-session

https://www.npmjs.com/package/cookie-session

```
var bcrypt = require('bcrypt');
bcrypt.hash(myPlaintextPassword, 10, function(err, hash) {
  // Store hash in your password DB.
});
bcrypt.compare(myPlaintextPassword, hash, function(err, matches) {
    // matches == true
});
```


##3 - XSS (Cross Site Scripting)

Taking untrusted data and displaying it in the browser.

Ex. <script>alert("PWND");</script> as content of a tweet.

Solution:

  - escape all untrusted data (anything that can be modified by an external party)
     - use  elem.innerText("foo") (regular js) or $(elem).text("foo") (jquery)
     - beware of using $(data) with unsafe data!
     - beware of using string interpolation for UI `<div>${foo}</div>`


##4 - Insecure Direct Object References

ex. cookie:  user-id=12345
ex. changing price=10.00 in a form
ex. bank.com/accounts/123456236

Solution:

  - authorize all access
  - don't expose actual object ids in public (URLs, HTML)
  - don't take actual object ids as input


##5 - Security Misconfiguration

  - default accounts
  - public stack traces on errors
  - default cookie secret
  - unclosed ports
  - directory listing

https://www.npmjs.com/package/helmet


#6 - Sensitive Data Exposure

  - sending as plain text over non-secure connection (ex. HTTP, EMAIL)
  - using old/weak crypto

  Solutions:

   - avoid handling secure data (ex. use Stripe, use Log in with Google)
   - use bcrypt

https://www.ssllabs.com/ssltest/
https://letsencrypt.org/

#7 - Missing Function Level Access Control

Assuming that your client-side UI is the only source of HTTP requests

Ex. Can CURL GET "http://foo.com/some/page?admin=true"

Solutions:

 - don't trust any input data (contents of HTTP requests are all "input")


#8 - CSRF (Cross-Site Request Forgery)

  Attacker embeds an  image (or form) on another page and issues a request:
    Ex. <img src="http://bank.com/app/transferFunds?amount=1500&destinationAccount=attackersAcct#" width="0" height="0" />


    CSRF tokens

  ex. sites.github.com
  ex.


  Solution:
   - don't use GET for modifications!
   - always use CSRF tokens


#9 - Using Components with Known Vulnerabilities

  - out of date software
     - anywhere on the stack:
        - operating system libraries
        - node
        - database
        - node libraries
        - front-end libraries

https://www.npmjs.com/package/nsp


#10 - Unvalidated Redirects and Forwards

Ex. http://www.example.com/redirect.jsp?url=evil.com

