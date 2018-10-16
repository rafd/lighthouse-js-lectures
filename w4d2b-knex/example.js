// before you run below examples, run:
// sqlite3 music.db < seed.sql

var knex = require('knex');

var db = knex({
   client: 'sqlite3',
   connection: {
       filename: './music.db'
}});

// INSERT (w/ NESTING)

/*
db.insert({name: "Artist Name"}).into("artists").then(function(results) {
   db.insert({title: "Album Title", year: 2018, artist_id: results[0]}).into("albums").then(function(results) {
     db.insert({title: "Song Title", number: 5, album_id: results[0]}).into("tracks").then(function() {
       db.select("*").where({title: "Song Title"}).from("tracks").then(function(results) { console.log(results) });
     });
   });
});
*/

// INSERT (w/ PROMISES)

db.insert({name: "Artist Name"}).into("artists").then(function(results) {
  return db.insert({title: "Album Title", year: 2018, artist_id: results[0]}).into("albums");
}).then(function(results) {
  return db.insert({title: "Song Title", number: 5, album_id: results[0]}).into("tracks");
}).then(function(results) {
  return db.select("*").where({title: "Song Title"}).from("tracks");
}).then(function(results) {
  console.log(results)
});


// DELETE

db.delete().from("tracks").where({title: "Song Title"}).then();
db.delete().from("albums").where({title: "Album Title"}).then();
db.delete().from("artists").where({name: "Artist Name"}).then();


// SELECT name FROM artists;

/*

var query = db.select("name").from("artists");

console.log(query.toSQL().sql);

query.then(function(results) {
   console.log(results);
});

*/


// SELECT title, number FROM tracks;

/*
db.select("title", "number").from("tracks").then(function(results) {
  console.log(results);
});
*/


// INCREMENTAL QUERIES

/*
var params = {"artist": "Daft Punk"};
var params2 = {"album": "Discovery"};

var query = db.select("tracks.title").from("tracks")
            .innerJoin("albums", "tracks.album_id", "albums.id")
            .innerJoin("artists", "albums.artist_id", "artists.id");

if(params) {
  query = query.where({"artists.name": params["artist"] });
}

if(params2) {
  query = query.where({"albums.title": params2["album"]});
}

console.log(query.toSQL().sql);

query.then(function(results) {
  console.log(results);
});
*/


// db.destroy();

