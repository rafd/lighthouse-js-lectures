const { Client } = require('pg')

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'lighthouse',
  password: 'lighthouse',
  database: 'w4d2'
})

const artistName = process.argv[2];

client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack)
  } else {

    client.query("SELECT * FROM artists WHERE UPPER(name) = UPPER($1) LIMIT 1", [artistName], (err, res) => {

      if (err) {
        console.log(err.stack)
      } else {
        if(res.rows[0]) {
          const artist = res.rows[0];
          console.log(artist.name);

          client.query("SELECT * FROM albums WHERE artist_id = $1", [artist.id], (err, res) => {
            if (err) {
              console.log(err.stack)
            } else {
              for(const album of res.rows) {
                client.query("SELECT * FROM tracks WHERE album_id = $1", [album.id], (err, res) => {
                  console.log("\t"+album.title);
                  for(track of res.rows) {
                    console.log(`\t\t${track.number}\t${track.title}`);
                  }
                })
              }
            }
          })
        }
      }
    })
  }
})