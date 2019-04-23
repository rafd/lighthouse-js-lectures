// before you run below examples, run:
// npm install
// knex migrate:latest 
// knex seed:run

var knex = require('knex');
var config = require('./knexfile.js')

var db = knex(config.development);


// -------------------------------------

console.log("INSERT (w/ NESTING)")

db.insert({name: "Artist Name"}).into("artists").then(function(results) {
   db.insert({title: "Album Title", year: 2018, artist_id: results[0]}).into("albums").then(function(results) {
     db.insert({title: "Song Title", number: 5, album_id: results[0]}).into("tracks").then(function() {
       db.select("*").where({title: "Song Title"}).from("tracks").then(function(results) { console.log(results) });
     });
   });
});


// -------------------------------------

console.log("INSERT (w/ PROMISES)")

db.insert({name: "Artist Name"}).into("artists").then(function(results) {
  return db.insert({title: "Album Title", year: 2018, artist_id: results[0]}).into("albums");
}).then(function(results) {
  return db.insert({title: "Song Title", number: 5, album_id: results[0]}).into("tracks");
}).then(function(results) {
  return db.select("*").where({title: "Song Title"}).from("tracks");
}).then(function(results) {
  console.log(results)
});


// -------------------------------------


console.log("DELETE")

db.delete().from("tracks").where({title: "Song Title"}).then();
db.delete().from("albums").where({title: "Album Title"}).then();
db.delete().from("artists").where({name: "Artist Name"}).then();


// -------------------------------------


console.log("SELECT name FROM artists;");

var query = db.select("name").from("artists");

console.log(query.toSQL().sql);

query.then(function(results) {
   console.log(results);
});


// -------------------------------------


console.log("SELECT title, number FROM tracks;");


db.select("title", "number").from("tracks").then(function(results) {
  console.log(results);
});

// -------------------------------------

console.log("INCREMENTAL QUERIES");

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


// ---------------------------------------

console.log("NESTED QUERIES USING CALLBACKS");

var query = db.select("name", "id").from("artists");

query.asCallback(function(err, results) {
   results.forEach(function(artist) {
     let q = db.select("title").from("albums").where({artist_id: artist.id});
     q.asCallback(function(err,   album){
       if(err){
         console.log(err)
       } else {
        console.log(album);
       }
     });
   });
  // db.destroy();
});

// -------------------------------------------

console.log("NESTED QUERIES USING PROMISES");

var query = db.select("name", "id").from("artists");

console.log(query.toSQL().sql);

query.then(function(results) {
  return results.map(function(artist) { return artist.id });
}).then(function(ids) {
  return Promise.all(
    ids.map(function(id) {
      return db.select("title").from("albums").where({artist_id: id});
    })
  )
}).then(function(results) {
   console.log(results)
}).then(function() {
   //db.destroy();
}).catch(function(err) {
   console.log(err)
})