require_relative "account"

module Bank
  class TFSA < Account
    INTEREST_RATE = 0.05
    LIMIT = 5000

    def deposit(amount)
      if can_deposit?(amount)
        super(amount)
      else
        puts "cannot deposit because over limit"
      end
    end

    private

    def can_deposit?(amount)
      (@balance + amount) < LIMIT
    end

  end
end
