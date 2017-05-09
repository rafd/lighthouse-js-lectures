class User < ActiveRecord::Base
  has_many :songs
  has_many :ratings, dependent: :destroy
  has_many :rated_songs, through: :ratings, source: :song

  # TODO validations

  before_save :standardize_email

  def rate(song, rating)
    Rating.create(song: song, user: self, rating: rating)
  end
  
   private

   def standardize_email
     self.email = self.email.downcase
   end

end
