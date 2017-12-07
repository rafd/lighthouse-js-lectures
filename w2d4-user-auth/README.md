`npm install` before running any of the examples

## server w/ cookie-based logins

```
node 0-server-cookies.js
```

## curl w/ manufactured cookie

```
./0-server-cookie-curl-hax.sh
```

## server w/ hashed passwords

```
node 1-server-cookies-hash-password.js
```

## server w/ encrypted cookies

```
node 2-server-encrypted-cookies.js
```

## comparing files

you can use `diff` to look at differences between files:

```
diff 0-server-cookies.js 1-server-cookies-hash-password.js
```
