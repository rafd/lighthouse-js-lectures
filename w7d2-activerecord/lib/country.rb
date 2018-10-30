class Country < ActiveRecord::Base
  has_many :cities
  # belongs_to :capital, class_name: "City", foreign_key: "capital_id"
end
