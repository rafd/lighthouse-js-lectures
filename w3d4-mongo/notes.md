# Databases and MongoDB

## Databases? Why?

problem:

most programs...

 - need to keep track of "state" (data) over time
 - want that data to persist even if the program restarts
 - want that data to persist even if the *computer* restarts

solution:

 - store the data to "disk" (usually the computers hard drive or other [non-volatile memory](https://en.wikipedia.org/wiki/Non-volatile_memory))

"quick and easy" solution:

  - store our data to a single JSON file (or a CSV, or other)
  - every time something changes update the file

"better" solution:
 
  - use a "real" database


### What do "real" databases offer?

  - ways to enforce rules about data
    (ex. "a user must have a name that is a string")

  - a nice API to make advanced queries

  - reliability guarantees
    (what happens if the network or power goes down in the middle of making a change? see [ACID](https://en.wikipedia.org/wiki/ACID) and [CAP](https://en.wikipedia.org/wiki/CAP_theorem))
  
  - speed
    (fast at reading data, querying, and writing)

  - efficiency 
    (uses RAM and hard-disk space efficiently)

  - parallel access
    (many clients can read and write to the database at the same time)

  - ability to scale
    (has a way to transition from small to huge amounts of data, think, multiple terabytes)


There are many databases, each designed for different use-cases, with different choices for the above factors (many of which are trade-offs).

For example...

  Postgres

    - open-source relational database which is above-average for most factors
    - cons: other databases may be better for specific needs
    - generally a good starting point for most web projects

  Redis 

    - very very fast
    - but: supports only simple queries and data structures, and in-memory only (doesn't persist)
    - used for caching, storing temporary data, passing messages between programs

  MongoDb 

    - easy to get started (no schema), syntax that feels like JS
    - but: some complain about performance and reliability
    - used by web devs, mostly js community

  Sqlite 

    - tiny embeddable sql database
    - but: no parallel access, does not scale well
    - used for embedding inside of mobile and desktop apps (ex. iTunes, Chrome)

  Solr
  
    - offers fast ways to do "searches" and rank results
    - but: not great at much else
    - used in addition with another database to implement searching (ex. search for a page, search for a product)

  PostGIS

    - an extension for Postgres that allows for efficiently storing and querying "geospatial" data (ex. locations on Earth)


### Why choose one database over another?

 - does the db model (how it stores things) match your data needs?
 - does the performance match how your data is used?
 - is it open-source?
 - does it cost money?
 - are the reliability guarantees sufficient?
 - is support available?
 - can we hire developers who know it?
 - can it scale?


## MongoDB

```
                                      _ document
                                     /
                     _____ collection - document
                    /
      ____  database ----- collection - document
     /                               \ 
server                                \_ document
    \
     \____  database ----- collection ...
                    \
                     \____ collection ...
```
      
a *server* has many *databases*
a *database* has many *collections*
a *collection* has many *documents*

ex.
```
server: my computer
  database: my_music_app
    collection: tracks
      document: { title: "Some Song", album: "Some Album", ...}
      document: { title: "Some Other Song", ...}
      document: { title: "Best Song", ... }
    collection: artists
      document: { name: "Daft Punk" }
      document: { name: "Drake" }
      document: { name: "Some Artist" }

```


## Working with MongoDB from the Mongo Shell

docs: https://docs.mongodb.com/v3.0/tutorial/getting-started-with-the-mongo-shell/

`mongo`

**remember to always start with `use my_database`**

```
show dbs
use music_db

db.tracks.insert({ title: "Some Song", album: "Some Album"})
db.tracks.insert({ title: "Other Song", album: "Other Album"})
db.tracks.insert({ title: "Best Song", album: "Other Album"})

db.tracks.find()

db.tracks.find({album: "Other Album"})

db.tracks.updateMany({album: "Other Album"}, {$set: {album: "Actually This Album"}})

db.tracks.updateOne({title: "Some Song"}, {$set: {album: "Some Other Album"}})

db.tracks.deleteOne({title: "Some Song"})
```



## Working with MongoDB from Node

docs: http://mongodb.github.io/node-mongodb-native/2.2/

example: https://github.com/kvirani/express_mongo_todo_example

- ``npm install mongodb --save``

- must have code to connect to the database before querying (connecting is async!)

- all queries are async too

- **the library syntax is slightly different than mongo shell (make sure you are reading the correct docs)**

- only `res.render(...)` or `res.redirect(...)` inside of the db callback

- should have code to disconnect from the database when killing the app



