require "active_record"

DEBUG = false

if DEBUG
	ActiveRecord::Base.logger = Logger.new(STDOUT)
end

DB_CONF = {
  adapter: 'sqlite3',
  database: 'bank.sql'
}

ActiveRecord::Base.establish_connection(DB_CONF)

ActiveRecord::Schema.define do
  drop_table :accounts if ActiveRecord::Base.connection.table_exists?(:accounts)
  drop_table :customers if ActiveRecord::Base.connection.table_exists?(:customers)
 
  create_table :accounts do |t|
    t.integer :balance
    t.integer :customer_id
  end

  create_table :customers do |t|
  	t.integer :total_balance
  end

end

class Customer < ActiveRecord::Base
	has_many :accounts

	after_save :log_message

	private

	def log_message
		puts "Customer #{id} saved, with #{accounts.count} accounts, total balance of #{total_balance or 0}"
	end
end

class Account < ActiveRecord::Base
	belongs_to :customer

	after_create :send_confirmation_email

	after_update :send_balance_change_email

	after_save :recalculate_customer_total_balance

	private

	def send_confirmation_email
		puts "EMAIL: Customer #{id}, thank you for creating account #{id} with balance #{balance}"
	end

	def send_balance_change_email
		puts "EMAIL: Customer #{id}, the balance of account #{id} has changed to #{balance}" 
	end

	def recalculate_customer_total_balance
		customer.total_balance = customer.accounts.all.reduce(0){|memo, account| memo + account.balance }
		customer.save
	end
end

c1 = Customer.create()
a1 = Account.create(balance: 1000, customer: c1)
a2 = Account.create(balance: 2000, customer: c1)

a1.balance = 0
a1.save