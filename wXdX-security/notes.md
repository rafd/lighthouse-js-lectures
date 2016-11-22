# Web Security

Now that you can create web apps, it is your responsibility to make the work properly.


Security issues are often non-technical
   (ex. figuring out answers to password reset questions)


Direct vulnerabilities
  potential vector of attack, to get access to a system or sensitive data
  ex. out of date software

Indirect vulnerabilities
  magnify chance or impact of other vulnerability
  ex. storing passwords plain text

Need to balance convenience and security.


# OWASP Top 10 Web Vulnerabilities

## #1 - Injection

Passing "untrusted data" to an interepreter, ex: when creating a database query.

"untrusted data"
  anything you haven't hardcoded
  ie. user input, API responses, HTTP requests, HTTP parameters

"interpreter"
  something that evaluates a string ("runs" a string as code)
  ex. SQL, Regex, require("..."), eval("..."), EJS (and other templating languages)
  also be careful with server-side compiling React apps


BAD:
```
var foo = require(req.params.page)
```


BAD:
```
var results = pg.query("SELECT * FROM accounts WHERE id=" + req.params.id);
```
What if `req.params.id` was: `"0; DROP TABLE accounts;"`


GOOD:
```
var results = pg.query("SELECT * FROM accounts WHERE id= $1", [req.params.id]);
```
The library "escapes" each value in the array.



"escaping"
  process of converting certain characters in a string from one version to another
    ex. ";" the character that ends a SQL command
            to  "\;" the semicolon character as text




STRATEGIES

  1. if available, use the safe parametrized API provided by the system
  2. if can't do 1, escape special characters manually
  3. generally, be extra careful when creating strings from variables



## #2 - Broken Auth / Session Management

 - not storing sensitive data properly
     ex. passwords
       BAD: encryption algorithm (ex. AES)
         passwords shouldn't be encrypted (which is a reverisible process)
       BAD: normal hash function (ex. md5)
       BAD: weak crypto hashing function (ex. SHA-1)
       GOOD: strong proven crypto hash function (ex. bcrypt)

     ex. cookies
       BAD: not encrypted
       BAD: broken/weak encryption (ex. AES-128)
       GOOD: strong encryption (ex. AES-512)

     ex. credit cards
       ADVICE: avoid storing at all, use a 3rd party service

 - cookies that are not secure-only and HTTP-only
     (easy to steal)

 - allowing unlimited password attempts

 - trusting registration without validating that the user owns the email account

 - weak account management functions
      ex. easy password recovery process (trivial questions)
      ex. password reset without sending an email

 - session ids exposed via URLs
      (easy to steal)

 - session that don't expore (or aren't rotated)
     if stolen, provide permanent access for the attacker

 - passwords, session ids, other credentials sent over unencrypted connections
     (easy to steal)



## #3 - XSS (Cross Site Scripting)

Evaluating untrusted data in the browser (in JS).

Ex.
  Allowing a tweet like this: <script>alert("PWND");</script>

  Then, including above as-is in other users HTML (ex. showing a list of tweets).

  When other user views the content, the script is run.

  Effectively, the attacker can run arbitrary JS on the other users page,
    can take actions as that user (ajax requests, clicking things)

Ex. CSS

  Setting CSS based on user input.
  Ex. `{ background-url: user_provided;}`
  URL could be: `"javascript:alert('PWND')"`


STRATEGY:

  - escape all untrusted data (anything that can be modified by an external party)
     - use  `elem.innerText("foo")` (regular js) or `$(elem).text("foo")` (jquery)
     - beware of using $(data) with unsafe data!
         BAD: `$("<div>"+foo+"</div>")`
         OK:  `$("<div>").text(foo)`
     - beware of using string interpolation for UI
         BAD: ``<div>${foo}</div>``
         OK:  ``<div>${escape(foo)</div>``
     - beware of dangerouslySetInnerHTML (in React)

https://www.owasp.org/index.php/XSS_(Cross_Site_Scripting)_Prevention_Cheat_Sheet


## #4 - Insecure Direct Object References

Accepting user input as correct/allowed.

ex. cookie:  user-id=12345
ex. form:    price=10.00
ex. url:     bank.com/accounts/123456236

"authentication":
  verifying identity
  "this request came from Bob"

"authorization":
   verifying permission
   "Bob is allowed to make this request"


Solution:
  - authenticate and check permissions for any sensitive data / actions
  - don't expose actual object ids in public (URLs, HTML)
  - don't take actual object ids as input



## #5 - Security Misconfiguration

  - forgetting to change defaults
      logins / accounts
      encryption keys (cookie secret)
  - showing stack traces on errors
  - keeping unnecessary ports open

https://www.npmjs.com/package/helmet



## #6 - Sensitive Data Exposure

  - sending data plain text over non-secure connection (ex. HTTP, EMAIL)
  - using old/weak crypto

  Solutions:

   - avoid handling secure data (ex. use Stripe, use Log in with Google)
   - always use HTTPS
     - SSL certificates are now free!  NO EXCUSE!
         https://letsencrypt.org/
         https://www.ssllabs.com/ssltest/
   - use bcrypt for encryption





## #7 - Missing Function Level Access Control

Forgetting that an "internal" part of your application can be accessed directly.

Ex. assuming that your client-side UI is the only source of HTTP requests

Ex. Can CURL GET "http://foo.com/some/page?admin=true"

Solutions:

 - don't trust any input data (contents of HTTP requests are all "input")
 - check in each HTTP request handler that the action is allowed for that user



## #8 - CSRF (Cross-Site Request Forgery)

  Attacker gets victim to visit a page he controls, triggering a GET or POST request as that user to a different domain.

  Ex. 1

  Attacker embeds an image on another page and issues a request:
  <img src="http://bank.com/app/transferFunds?amount=1500&destinationAccount=attackersAcct#" width="0" height="0" />
  When you visit the site, it makes the request, using YOUR cookies (if you are logged in).

  SOLUTION:
   - GET requests should NEVER do any state change action


  Ex. 2

  Attacker embeds a form + some JS to click it:
    <form method="POST" action="http://bank.com/....">

  SOLUTION:
    - CSRF tokens

       when you create the form for YOUR site, you include a secret random token string, which is submitted with the form
       your server checks that the token that you gave the browser matches the token in the POST request

    - other approaches: https://www.owasp.org/index.php/CSRF



  Ex. 3
    You enable CORS on your site to allow your SPA Ajax do cross-domain requests
    Now, if a victim vists an an attacker's site, the attacker can make an ajax requests to your site using the victims cookies.

    SOLUTION:
      - Be VERY careful about how you configure CORS
        - only allow the domains that have permission
        - only allow the routes and methods that should be open to anyone to access
        - use authentication tokens / CSRF tokens
      - Use CSRF tokens or some form of authentication



## #9 - Using Components with Known Vulnerabilities

  - out of date software
     - anywhere on the stack:
        - operating system libraries
        - node
        - database
        - node libraries
        - front-end libraries

  - you must keep your software up to date
  - when vulnerabilities happen, they are often very serious
  - ex.
     - Heartbleed (2014)
       pretty much every site on internet
       could read unencrypted data from SSL connections
       https://en.wikipedia.org/wiki/Heartbleed
    - Shellshock (2014)
      any user with access to bash can escalate to root
      https://en.wikipedia.org/wiki/Shellshock_(software_bug)
    - Rootpipe (2014)
      a Mac OSX user can get root privileges without password
      https://en.wikipedia.org/wiki/Rootpipe
    - Stagefright (2015)
      an MMS message to an Android device would give attacker root access
    - DROWN (2016)
      a way to downgrade an SSL connection to an insecure version
    - Dirty COW (2016)
      a user with shell access to a linux(+android) system can get root access


  SOLUTION
    - run updates frequently
    - keep your app's packages up to date:
         https://www.npmjs.com/package/nsp



## #10 - Unvalidated Redirects and Forwards

Ex. http://www.example.com/redirect.jsp?url=evil.com






# How to Protect Yourself

## Passwords

  - you should use a unique on every site
      b/c can't trust that other site developers did the right thing with your password (bcrypt)
         Adobe, Dropbox, LinkedIn, MySpace, Tumblr, Last.fm, Bell have had their users' passwords/passoword-hashes leaked
     https://haveibeenpwned.com/

  - longer passwords passwords are better

  - avoid words (esp with short passwords)
      - swapping letters doesn't do much (ie. p455worD is almost as weak as password)

  - avoid common passwords

     http://www.passwordrandom.com/most-popular-passwords

  SUGGESTION

  1. use a password manager
       ex. 1password
       can generate unique random 30+ digit passwords for each site
       easy to use, integrates with browser, syncs between devices

  2. otherwise, prefer google login or facebook login

  3. otherwise, use unique randomly generated pass phrase per site

      https://xkpasswd.net/s/


## Secure Communication

 - use a VPS
     b/c 'no password' wifi is insecure
     b/c you can't be sure your mobile apps are using HTTPs
     b/c a website may switch from HTTPs to HTTP

 - don't send sensitive data via email
    - consider all emails to be public
    - use Signal app for secure communication
