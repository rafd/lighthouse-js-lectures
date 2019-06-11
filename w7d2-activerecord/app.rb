require "pry"
require "active_record"
require_relative "db/config.rb"

require_relative "lib/treaty"
require_relative "lib/country"
require_relative "lib/city"

require_relative "db/seed.rb"



binding.pry

# try:


c = Treaty.all.first.countries
c.treaties

Country.all

Country.first

Country.first.cities

Country.first.cities.first.name


Country.where("population > ?", 4000000)