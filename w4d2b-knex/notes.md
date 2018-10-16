# Knex

http://knexjs.org/

today, you've been working on how to interact with a database from Javascript

in this breakout, we introduce Knex, a utility library for working with SQL databases

start with an overview of what Knex offers, then, go into some code on how to use it


## Why not use pg?

  databases are seperate systems, with their own abstractions and concepts
  many potential ways to interact with a database from a given language (ie. a different API)
  different libs have different wanys of resolving the differences between how DB represets data and how JS does

    ex.
       ORM
          - represent db objects as language objects
          - see this in Ruby later with active record
          - JS, by convention, tends to be less object oriented, and so, less use of ORM

       Datamapper
          - pattern of writing functions to convert from DB objects to language records

       Misc DB utilities
         - various types of tooling to make common things with working with a DB easier
         - ex. knex

       Raw / direct access
          - (ex. pg lib)
          - full power, sometimes awkward, verbose, easy to do things wrong


## Why Knex

  1. calls itself a "query builder", ie.  use js to write SQL queries

     - compose functions instead of concating strings

     - easier to programmatically generate queries

     - easier to avoid SQL injection
         all knex functions escape their input parameters

        Review question: What is injection?


   2. interact with multiple types of SQL databases without changing code

      - Question: why might this be useful?
        A: common to use sqlite in dev, postgres in prod

      - however, each db implements its own version of SQL, a lot of overlap, but you may still have to have different codepaths in dev vs prod
      - but definitely does avoid having to use completely different libs and different APIs to interact with two different databases


   3. helpers to manage "migrations"

      Migrations are a way to:
        1) make changes to the db schema
        2) manage changes to the db schema over time (in sync with our changes to our app's code)

        ... making it possible to "sync" changes between devs working on an app

      Review question: What is db schema?
                   A: the "shape" of the database, which tables and columns exist (but not, what data is in the db)

      How? By describing our db schema in code (and tracking it with git along with the rest of our code)

      Process:
        - Each time you want to make a change to db schema, you generate a migration file (which is time stamped)
        - In the file you describe the changes (and, how to undo the changes)
        - use knex commands to "apply" or "rollback" migrations

        - knex provides ways to "catch up my db to latest migration", "rollback (undo) a migration", "wipe database and migrate to latest"

        - IMPORTANT: never change an existing migration (especiallu if it's been committed + pushed), always create a new migration

      https://en.wikipedia.org/wiki/Schema_migration



   4. helpers to manage "seeding"

     - it's often useful to have some fake data to work with when developing our applications

     - seeding is "running a script to populate your database with some data", usually just used for development & testing

     - knex provides a way to describe seed data and command line functions to insert the data

     - like with migrations, you want to keep seed scripts up to date with changes to your app







## Knex - Basics

```javascript
var knex = require('knex');

var db = knex({
  client: 'sqlite3',
  connection: {
    filename: './db.sqlite'
  }
});

db.schema.createTable('artists', function(table) {
  table.increments('id');
  table.string('name');
}).then(function() {
  return db.insert({name: 'Explosions in the Sky'}).into('artists');
}).then(function() {
  return db('artists');
}).forEach(function(row) {
  console.log(row);
});

db.destroy();
```

To run a single query, you will need to end it with a `.then(...)`:

```javascript
db.select("name").from("artists").then(function(rows) {
  console.log(rows);
});
```

### Debugging

You can have Knex show you the SQL query it generates:

```javascript
var query = db.select().from("artists");
console.log(query.toSQL().sql);
```

### Closing the Connection

Knex keeps the db connection open and will prevent your program from ending until you call `db.destroy()`:

```javascript
db.destroy();
```


### Conditional Chaining

```javascript
var query = knex.select(["name", "email"]).from("users");

var email = process.argv[2];
/ if email was specified, then filter
if(email) {
  query = query.where({"email": email});
}
query.then(function(rows) {
  //...
});
```


## Knex - Migrations

http://knexjs.org/#Migrations

Knex has a CLI program that helps you create migrations and run them forwards and backwards.

```bash
knex migrate:make MIGRATION_NAME
```

```bash
knex migrate:latest
```

```bash
knex migrate:rollback
```



## Knex - Seeding

http://knexjs.org/#Seeds-CLI

Knex has a CLI program that helps you create seed files:

```bash
knex seed:make seed_name
```

```bash
knex seed:run
```


