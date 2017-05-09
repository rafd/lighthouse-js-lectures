require "active_record"
require_relative "config.rb"

require_relative "../lib/user"
require_relative "../lib/song"
require_relative "../lib/rating"

User.destroy_all
Song.destroy_all
Rating.destroy_all

user1 = User.create(name: "Alice", email: "Alice@example.com")

user1.songs << song11 = Song.create(title: "Sick Beat")
user1.songs << song12 = Song.create(title: "Epic Tune")
user1.songs << song13 = Song.create(title: "Mad Track")

user2 = User.create(name: "Bob", email: "BOB@example.com")

user2.songs << song21 = Song.create(title: "Pretty Ditty")
user2.songs << song22 = Song.create(title: "Long Song")
user2.songs << song23 = Song.create(title: "Strawberry Jam")

user2.rate(song11, 5)
user2.rate(song12, 3)

user1.rate(song21, 4)
user1.rate(song22, 3)
