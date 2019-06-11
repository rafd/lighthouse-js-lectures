require "active_record"

ActiveRecord::Base.logger = Logger.new(STDOUT)

DB_CONF = {
  adapter: 'sqlite3',
  database: 'db/w7d2.sql'
}

ActiveRecord::Base.establish_connection(DB_CONF)
