require_relative "account"

module Bank
  class SavingsAccount < Account
    class InsufficientFunds < Exception
    end

    INTEREST_RATE = 0.01

    def withdraw(amount)
      if sufficient_funds?(amount)
        super(amount)
      else
        raise InsufficientFunds
      end
    end

    private

    def sufficient_funds?(amount)
      @balance - amount > 0
    end

  end
end
