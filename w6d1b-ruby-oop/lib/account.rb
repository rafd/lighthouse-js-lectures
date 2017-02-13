module Bank
  class Account
    INTEREST_RATE = 0

    attr_reader :balance

    @@all = []

    def initialize(start_balance)
      @balance = start_balance
      @@all << self
    end

    def deposit(amount)
      @balance += amount.round(2)
    end

    def withdraw(amount)
      @balance -= amount
    end

    def credit_interest
      # instead of the following:
      # @balance += (@balance * @interest_rate)
      # we write:
      deposit(@balance * self.class::INTEREST_RATE)
      # so we don't duplicate the logic of what a "deposit" means
    end

    def self.all
      @@all
    end
  end
end
