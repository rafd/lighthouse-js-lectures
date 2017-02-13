require "pry"
require_relative 'lib/savings_account'
require_relative 'lib/chequing_account'
require_relative 'lib/tfsa'

sa1 = Bank::SavingsAccount.new(5000)
p "balance", sa1.balance

sa1.deposit(123)
p "balance", sa1.balance

sa1.withdraw(100)
p "balance", sa1.balance

p "interest rate", Bank::SavingsAccount::INTEREST_RATE


tfsa = Bank::TFSA.new(1000)

tfsa.credit_interest
tfsa.credit_interest
tfsa.credit_interest
tfsa.credit_interest

p "tfsa balance", tfsa.balance


p "accounts", Bank::Account.all

# following triggers an InsufficientFunds exception:
sa1.withdraw(10000)

# binding.pry
