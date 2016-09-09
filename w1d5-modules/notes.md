= Modules

```
// lib/my-module.js

module.exports = {
 foo: 123,
 bar: function() {
   // ...
 }
}
```

```
myModule = require("./lib/my-module");

myModule.foo;
myModule.bar()
```

= NPM

Modules that are published to NPM are called "packages" (or "libraries").

https://npmjs.org/

Your project should contain a `project.json`, which you create using:

```
npm init
```

```

```

Install and add a package to `package.json`:

```
npm install --save package-name
```

Install a development-only package and add to `package.json`:

```
npm install --save-dev package-name
```

Install a package globally (usually b/c it provides a commandline program):

```
npm install --global package-name
```

However, this is not recommended, because you can't multiple versions on your system. Instead, you should add a script to `package.json`:

```
...
"scripts": {
  "mocha": "mocha"
}
...
```

Which you can run by doing:

```
npm run mocha
```

(This runs the version of `mocha` that is installed locally for the current project)


= Mocha

http://mochajs.org/

http://chaijs.com/

```
npm install --save-dev mocha chai
```

Then, add it scripts in `package.json`:

```
...
"scripts": {
  "test": "mocha"
}
...
```

Which you can run by doing:

```
npm run test
```

or

```
npm test
```
(`test` is the only script that you can skip the `run` command for)

Typically, in a node project, you would have modules in `./lib/` and tests in `./test/`


= Bank Example

To run the tests, do:

```
npm install
```

Then:

```
npm test
```
