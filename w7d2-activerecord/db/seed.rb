require "active_record"
require_relative "config.rb"
require_relative "../lib/country"
require_relative "../lib/city"

City.destroy_all
Country.destroy_all
Treaty.destroy_all

nafta = Treaty.create(name: "Nafta")

canada = Country.create(name: "Canada", population: 37314442, area: 9984670)

canada.treaties << nafta # could also have done: nafta.countries << canada


# method 1 of associating
City.create(name: "Toronto", country: canada)

# method 2 of associating
City.create(name: "Vancouver", country_id: canada.id)

# method 3 of associating
ottawa = City.create({name: "Ottawa"})
canada.cities << ottawa

Country.create(name: "USA", population: 327167434, area: 3796742)



