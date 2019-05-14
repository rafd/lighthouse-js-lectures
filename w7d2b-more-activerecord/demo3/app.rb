require "pry"
require_relative "db/config"
require_relative "db/schema"
require_relative "db/seed"
require_relative "lib/All"


user = User.first
owned = user.owned_songs
liked = user.liked_songs

# this is bad, because it makes 1 query per song
rated_bad = user.ratings.map {|rating|
  rating.song
}

# this is better, because it uses joins
# (had to set up a through relationship in the classes)
rated_good = user.rated_songs



song = Song.first

owner = song.owner
likers = song.liking_users
raters = song.rating_users


binding.pry



