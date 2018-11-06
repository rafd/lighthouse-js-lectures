require "pry"
require "active_record"
require_relative "db/config.rb"

require_relative "./lib/User"
require_relative "./lib/Song"
require_relative "./lib/Rating"

binding.pry

User.all

u = User.first

u.songs
u.ratings
u.rated_songs
u.songs.first.ratings
u.ratings.first.user
u.rate(Song.first, 5)







