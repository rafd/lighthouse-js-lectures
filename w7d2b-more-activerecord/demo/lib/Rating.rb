class Rating < ActiveRecord::Base
  belongs_to :user
  belongs_to :song

  validates :rating,
     presence: true,
     numericality: { only_integer: true,
                     greater_than_or_equal_to: 0,
                     less_than_or_equal_to: 5 }

  after_create :email_user

  private

  def email_user
    p "Hey #{self.song.user.name}, #{self.user.name} rated your song '#{self.song.title}' #{self.rating} stars!"
  end

end
