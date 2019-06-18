const { Client } = require('pg')

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'lighthouse',
  password: 'lighthouse',
  database: 'w4d2'
})

const artistName = process.argv[2];

const joinQuery = `SELECT
 artists.name, 
 albums.title AS album_title,
 tracks.title AS track_title, 
 tracks.number FROM artists, albums, tracks 
WHERE artists.name = $1
AND albums.artist_id = artists.id
AND tracks.album_id = albums.id`;

client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    client.query(joinQuery, 
                  [artistName], (err, res) => {
                    const albums = {};

                    console.log(artistName)

                    for(row of res.rows) {
                      if(!albums[row.album_title]) {
                        albums[row.album_title] = []
                      }
                       albums[row.album_title].push(row)
                    }

                    for(albumTitle in albums) {
                      console.log("\t"+albumTitle)
                      for(track of albums[albumTitle]) {
                        console.log(`\t\t${track.number}\t${track.track_title}`);
                      }
                    }

    })
  }
})