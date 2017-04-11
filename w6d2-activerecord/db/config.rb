require "active_record"

ActiveRecord::Base.logger = Logger.new(STDOUT)

DB_CONF = {
  adapter: 'postgresql',
  encoding: 'unicode',
  pool: 5,
  database: 'w6d2',
  host: 'localhost',
  port: 5432
}

ActiveRecord::Base.establish_connection(DB_CONF)
