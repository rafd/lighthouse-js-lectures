class Country < ActiveRecord::Base
	has_and_belongs_to_many :treaties
  has_many :cities
end
