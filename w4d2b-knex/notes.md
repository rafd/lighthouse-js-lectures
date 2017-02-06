# Knex

http://knexjs.org/

## Why Knex

  - work with different SQL databases (ex. sqlite in development, postgres in production)
  - avoiding SQL injection (thanks to escaping input parameters)
  - incremental query building
  - migrations


## Basics

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

## Migrations

Migrations are a way for us to keep track of changes to the database schema (the "shape" of the database) over time, in sync with our changes to our applications code.

https://en.wikipedia.org/wiki/Schema_migration

Oonce you've committed and pushed a migration, you should not change it! You need to create a new one.

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

## Seed Files

It's often useful to have some fake data to work with when developing our applications.

Seed files are scripts that can be run to populate the database with some initial data, usually, just used in development.

http://knexjs.org/#Seeds-CLI

Knex has a CLI program that helps you create seed files:

```bash
knex seed:make seed_name
```

```bash
knex seed:run
```


