class Song < ActiveRecord::Base
  belongs_to :user
  has_many :ratings, dependent: :destroy

  # TODO validations

  before_save :add_slug

  private

  def add_slug
    self.slug = self.title.gsub(" ", "-").downcase
  end
end
