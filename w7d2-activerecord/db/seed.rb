require "active_record"
require_relative "config.rb"
require_relative "../lib/country"
require_relative "../lib/city"

canada = Country.create({name: "Canada", population: 123125, area: 123124124})
canada.cities << City.create({name: "Toronto"})
canada.cities << City.create({name: "Vancouver"})

ottawa = City.create({name: "Ottawa"})
canada.cities << ottawa
canada.capital = ottawa # does not immediately persist, needs to be saved
canada.save

Country.create({name: "USA", population: 123125, area: 123124124})

Country.all

Country.first

Country.first.cities
