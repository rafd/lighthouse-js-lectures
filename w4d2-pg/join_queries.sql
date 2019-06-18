SELECT * 
FROM 
  artists, albums, tracks 
WHERE 
  artists.name = 'Explosions in the Sky' AND 
  albums.artist_id = artists.id AND
  tracks.album_id = albums.id;


SELECT * 
FROM artists
JOIN albums ON albums.artist_id = artists.id
JOIN tracks ON tracks.album_id = albums.id
WHERE artists.name = 'Explosions in the Sky';
