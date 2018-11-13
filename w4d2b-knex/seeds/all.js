exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('tags').del(),
    knex('artists').del(),
    knex('albums').del(),
    knex('tracks').del(),

    knex('tags').insert({id: 1, name: 'post-rock'}),
    knex('tags').insert({id: 2, name: 'instrumental'}),
    knex('tags').insert({id: 3, name: 'electronic'}),
    knex('tags').insert({id: 4, name: 'dance'}),

    knex('artists').insert({id: 1, name: "Explosions in the Sky"}),

    knex('artists_tags').insert({artist_id: 1, tag_id: 1}),
    knex('artists_tags').insert({artist_id: 1, tag_id: 2}),

    knex('albums').insert({id: 1, title: "The Earth is not a Cold Dead Place", year: 2003, artist_id: 1}),

    knex('tracks').insert({title: "First Breath After Coma", number: 1, album_id: 1}),
    knex('tracks').insert({title: "The Only Moment We Were Alone", number: 2, album_id: 1}),
    knex('tracks').insert({title: "Six Days at the Bottom of the Ocean", number: 3, album_id: 1}),
    knex('tracks').insert({title: "Memorial", number: 4, album_id: 1}),
    knex('tracks').insert({title: "Your Hand in Mine", number: 5, album_id: 1}),

    knex('albums').insert({id: 2, title: "All of a Sudden I Miss Everyone", year: 2007, artist_id: 1}),

    knex('tracks').insert({title: "The Birth and Death of the Day", number: 1, album_id: 2}),
    knex('tracks').insert({title: "Welcome, Ghosts", number: 2, album_id: 2}),
    knex('tracks').insert({title: "It's Natural To Be Afraid", number: 3, album_id: 2}),
    knex('tracks').insert({title: "What Do You Go Home To?", number: 4, album_id: 2}),
    knex('tracks').insert({title: "Catastrophe and the Cure", number: 5, album_id: 2}),
    knex('tracks').insert({title: "So Long, Lonesome", number: 6, album_id: 2}),

    knex('artists').insert({id: 2, name: "God is an Astronaut"}),

    knex('artists_tags').insert({artist_id: 2, tag_id: 1}),
    knex('artists_tags').insert({artist_id: 2, tag_id: 2}),

    knex('albums').insert({id: 3, title: "All is Violent, All is Bright", year: 2005, artist_id: 2}),

    knex('tracks').insert({title: "Fragile", number: 1, album_id: 3}),
    knex('tracks').insert({title: "All is Violent, All is Bright", number: 2, album_id: 3}),
    knex('tracks').insert({title: "Forever Lost", number: 3, album_id: 3}),
    knex('tracks').insert({title: "Fireflies and Empty Skies", number: 4, album_id: 3}),
    knex('tracks').insert({title: "A Deafening Distance", number: 5, album_id: 3}),
    knex('tracks').insert({title: "Infinite Horizons", number: 6, album_id: 3}),
    knex('tracks').insert({title: "Suicide by Star", number: 7, album_id: 3}),
    knex('tracks').insert({title: "Remembrance Day", number: 8, album_id: 3}),
    knex('tracks').insert({title: "Dust and Echoes", number: 9, album_id: 3}),
    knex('tracks').insert({title: "When Everything Dies", number: 10, album_id: 3}),

    knex('artists').insert({id: 3, name: "Ratatat"}),

    knex('artists_tags').insert({artist_id: 3, tag_id: 2}),
    knex('artists_tags').insert({artist_id: 3, tag_id: 3}),

    knex('albums').insert({id: 4, title: "Classics", year: 2006, artist_id: 3}),

    knex('tracks').insert({title: "Montanita", number: 1, album_id: 4}),
    knex('tracks').insert({title: "Lex", number: 2, album_id: 4}),
    knex('tracks').insert({title: "Gettysburg", number: 3, album_id: 4}),
    knex('tracks').insert({title: "Wildcat", number: 4, album_id: 4}),
    knex('tracks').insert({title: "Tropicana", number: 5, album_id: 4}),
    knex('tracks').insert({title: "Loud Pipes", number: 6, album_id: 4}),
    knex('tracks').insert({title: "Nostrand", number: 7, album_id: 4}),
    knex('tracks').insert({title: "Swisha", number: 8, album_id: 4}),
    knex('tracks').insert({title: "Kennedy", number: 9, album_id: 4}),
    knex('tracks').insert({title: "Tacobel Canon", number: 10, album_id: 4}),

    knex('artists').insert({id: 4, name: "Daft Punk"}),

    knex('artists_tags').insert({artist_id: 4, tag_id: 3}),
    knex('artists_tags').insert({artist_id: 4, tag_id: 4}),

    knex('albums').insert({id: 5, title: "Discovery", year: 2001, artist_id: 4}),

    knex('tracks').insert({title: "One More Time", number: 1, album_id: 5}),
    knex('tracks').insert({title: "Aerodynamic", number: 2, album_id: 5}),
    knex('tracks').insert({title: "Digital Love", number: 3, album_id: 5}),
    knex('tracks').insert({title: "Harder, Better, Faster, Stronger", number: 4, album_id: 5}),
    knex('tracks').insert({title: "Crescendolls", number: 5, album_id: 5}),
    knex('tracks').insert({title: "Nightvision", number: 6, album_id: 5}),
    knex('tracks').insert({title: "Superheroes", number: 7, album_id: 5}),
    knex('tracks').insert({title: "High Life", number: 8, album_id: 5}),
    knex('tracks').insert({title: "Something About Us", number: 9, album_id: 5}),
    knex('tracks').insert({title: "Voyager", number: 10, album_id: 5}),
    knex('tracks').insert({title: "Veridis Quo", number: 11, album_id: 5}),
    knex('tracks').insert({title: "Short Circuit", number: 12, album_id: 5}),
    knex('tracks').insert({title: "Face to Face", number: 13, album_id: 5}),
    knex('tracks').insert({title: "Too Long", number: 14, album_id: 5}),

    knex('albums').insert({id: 6, title: "Homework", year: 1997, artist_id: 4}),

    knex('tracks').insert({title: "Daftendirekt", number: 1, album_id: 6}),
    knex('tracks').insert({title: "WDPK 83.7 FM", number: 2, album_id: 6}),
    knex('tracks').insert({title: "Revolution 909", number: 3, album_id: 6}),
    knex('tracks').insert({title: "Da Funk", number: 4, album_id: 6}),
    knex('tracks').insert({title: "Phoenix", number: 5, album_id: 6}),
    knex('tracks').insert({title: "Fresh", number: 6, album_id: 6}),
    knex('tracks').insert({title: "Around the World", number: 7, album_id: 6}),
    knex('tracks').insert({title: "Rollin' & Scratchin'", number: 8, album_id: 6}),
    knex('tracks').insert({title: "Teachers", number: 9, album_id: 6}),
    knex('tracks').insert({title: "High Fidelity", number: 10, album_id: 6}),
    knex('tracks').insert({title: "Rock'n Roll", number: 11, album_id: 6}),
    knex('tracks').insert({title: "Oh Yeah", number: 12, album_id: 6}),
    knex('tracks').insert({title: "Burnin'", number: 13, album_id: 6}),
    knex('tracks').insert({title: "Indo Silver Club", number: 14, album_id: 6}),
    knex('tracks').insert({title: "Alive", number: 15, album_id: 6}),
    knex('tracks').insert({title: "Funk Ad", number: 16, album_id: 6}),

    knex('albums').insert({id: 7, title: "Human After All", year: 2005, artist_id: 4}),

    knex('tracks').insert({title: "Human After All", number: 1, album_id: 7}),
    knex('tracks').insert({title: "The Prime Time of Your Life", number: 2, album_id: 7}),
    knex('tracks').insert({title: "Robot Rock", number: 3, album_id: 7}),
    knex('tracks').insert({title: "Steam Machine", number: 4, album_id: 7}),
    knex('tracks').insert({title: "Make Love", number: 5, album_id: 7}),
    knex('tracks').insert({title: "The Brainwasher", number: 6, album_id: 7}),
    knex('tracks').insert({title: "On/Off", number: 7, album_id: 7}),
    knex('tracks').insert({title: "Television Rules The Nation", number: 8, album_id: 7}),
    knex('tracks').insert({title: "Technologic", number: 9, album_id: 7}),
    knex('tracks').insert({title: "Emotion", number: 10, album_id: 7}),

    knex('albums').insert({id: 8, title: "Random Access Memories", year: 2013, artist_id: 4}),

    knex('tracks').insert({title: "Give Life Back to Music", number: 1, album_id: 8}),
    knex('tracks').insert({title: "The Game of Love", number: 2, album_id: 8}),
    knex('tracks').insert({title: "Giorgio by Moroder", number: 3, album_id: 8}),
    knex('tracks').insert({title: "Within", number: 4, album_id: 8}),
    knex('tracks').insert({title: "Instant Crush", number: 5, album_id: 8}),
    knex('tracks').insert({title: "Lose Yourself to Dance", number: 6, album_id: 8}),
    knex('tracks').insert({title: "Touch", number: 7, album_id: 8}),
    knex('tracks').insert({title: "Get Lucky ", number: 8, album_id: 8}),
    knex('tracks').insert({title: "Beyond", number: 9, album_id: 8}),
    knex('tracks').insert({title: "Motherboard", number: 10, album_id: 8}),
    knex('tracks').insert({title: "Fragments of Time", number: 11, album_id: 8}),
    knex('tracks').insert({title: "Doin' It Right", number: 12, album_id: 8}),
    knex('tracks').insert({title: "Contact", number: 13, album_id: 8})

  ]);
};


