require "active_record"
require_relative "config.rb"

ActiveRecord::Schema.define do
  drop_table :songs if ActiveRecord::Base.connection.table_exists?(:songs)
  drop_table :users if ActiveRecord::Base.connection.table_exists?(:users)
  drop_table :ratings if ActiveRecord::Base.connection.table_exists?(:ratings)

  create_table :songs do |t|
    t.string :title
    t.string :slug
    t.integer :user_id
  end

  create_table :users do |t|
    t.string :name
    t.string :email
  end

  create_table :ratings do |t|
    t.integer :song_id
    t.integer :user_id
    t.integer :rating
  end

end
