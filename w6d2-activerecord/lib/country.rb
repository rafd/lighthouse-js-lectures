class Country < ActiveRecord::Base
  has_many :cities

  # not following the default conventions of AR, so need to put extra info
  belongs_to :capital, class_name: "City", foreign_key: "capital_id"
end
