require "active_record"
require_relative "config.rb"

ActiveRecord::Schema.define do
  drop_table :countries if ActiveRecord::Base.connection.table_exists?(:countries)
  drop_table :cities if ActiveRecord::Base.connection.table_exists?(:cities)

  create_table :treaties do |t|
    t.string :name
  end

  create_table :countries_treaties do |t|
    t.integer :country_id
    t.integer :treaty_id
  end

  create_table :countries do |t|
    t.string :name
    t.integer :population
    t.integer :area
  end

  create_table :cities do |t|
    t.string :name
    t.integer :country_id
    t.index :country_id
  end

end
