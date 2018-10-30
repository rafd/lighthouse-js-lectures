require "active_record"

ActiveRecord::Base.logger = Logger.new(STDOUT)

DB_CONF = {
  adapter: 'sqlite3',
  database: 'db/w6d2b.sql'
}

ActiveRecord::Base.establish_connection(DB_CONF)
