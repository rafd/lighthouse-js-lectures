require_relative "../lib/All"

user1 = User.create(name: "Alice")
user2 = User.create(name: "Bob")

song1 = Song.create(title: "First Song", owner: user1)
song2 = Song.create(title: "Second Song", owner: user2)

rating1 = Rating.create(value: 5, song: song1, user: user1)
rating2 = Rating.create(value: 3, song: song2, user: user1)

user2.liked_songs << song1
song1.liking_users << user1