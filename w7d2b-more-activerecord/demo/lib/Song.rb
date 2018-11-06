class Song < ActiveRecord::Base
  belongs_to :user
  has_many :ratings, dependent: :destroy

  validates :title,
    presence: true

  validates :slug,
    presence: true,
    uniqueness: true,
    format: { with: /[a-z-]*/,
              message: 'invalid format' }

  before_save :add_slug

  private

  def add_slug
    self.slug = self.title.gsub(" ", "-").downcase
  end
end
