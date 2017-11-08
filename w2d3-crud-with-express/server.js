const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

const database = {
  songs: { 
           1252: { 
                   id: "1252",
                   title: "Harder, Better, Faster, Stronger",
                   artist: "Daft Punk"
                 },
           6126: { 
                   id: "6126",
                   title: "One More Time",
                   artist: "Daft Punk"
                 },
           4242: {
                   id: "4242",
                   title: "Loud Pipes",
                   artist: "Ratatat"
                 },
           1624: {
                   id: "1624",
                   title: "Cream on Chrome",
                   artist: "Ratatat"
                 }
          }
};

function newId() {
  return Math.floor(Math.random()*10000);
}

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/songs', (req, res) => {
  res.render('songs/index', { songs: Object.values(database.songs) });
});

app.get('/songs/search', (req, res) => {
  const searchQuery = req.query.searchQuery;
  res.render('songs/index', 
    {
      songs: Object.values(database.songs).filter((song) => { return searchQuery == song.artist} ),
      searchQuery: searchQuery
    });
});

app.get('/songs/:id', (req, res) => {
  res.render('songs/show', {
    song: database.songs[req.params.id]
  });
});

app.post('/songs', (req, res) => {
  const song = req.body;
  song.id = newId();
  database.songs[song.id] = song; 
  res.redirect('/songs/' + song.id);
});

app.post('/songs/:id', (req, res) => {
  database.songs[song.id] = req.body;
  res.redirect('/songs/' + song.id);
});

app.post('/songs/:id/delete', (req, res) => {
  delete database.songs[req.params.id] 
  res.redirect('/songs/');
});

app.listen(8080);
console.log("Started server on port 8080")
