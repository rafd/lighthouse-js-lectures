require "active_record"

# normally, we would have one class per file
# but keeping them together for this example

# below classes have the following relationships
#  user "owns" songs    User -* Song
#  user "likes" songs   User *-* Song (or could be User -* Like *- Song)
#  user "rates" songs   User *-* Song (we do User -* Rating *- Song)

# because there are multiple relationships between User and Song
# we must pass extra options to the relationships
# so that we can disambiguate the relationships

class Rating < ActiveRecord::Base
  belongs_to :song
  belongs_to :user
end

class Song < ActiveRecord::Base
  has_and_belongs_to_many :liking_users, class_name: "User", join_table: "likes"
  belongs_to :owner, class_name: "User"
  has_many :ratings
  has_many :rating_users, through: :ratings, source: :user
end

class User < ActiveRecord::Base
	has_many :owned_songs, class_name: "Song"
	has_and_belongs_to_many :liked_songs, class_name: "Song", join_table: "likes"
	has_many :ratings
	has_many :rated_songs, through: :ratings, source: :song
end



