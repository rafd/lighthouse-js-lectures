require "pry"
require "active_record"
require_relative "db/config.rb"

require_relative "./lib/user"
require_relative "./lib/song"
require_relative "./lib/rating"

binding.pry

User.all

u = User.first

u.songs
u.ratings
u.rated_songs
u.songs.first.ratings
u.ratings.first.user
u.rate(Song.first, 5)







