class Rating < ActiveRecord::Base
  belongs_to :user
  belongs_to :song

  # TODO validations

  before_save :clamp_rating
  after_create :email_user

  private

  def clamp_rating
    if self.rating > 5
      self.rating = 5
    elsif self.rating < 0
      self.rating = 0
    end
  end

  def email_user
    p "Hey #{self.song.user.name}, #{self.user.name} rated your song '#{self.song.title}' #{self.rating} stars!"
  end

end
