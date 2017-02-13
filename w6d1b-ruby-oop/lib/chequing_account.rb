require_relative "account"

module Bank
  class ChequingAccount < Account
    INTEREST_RATE = 0.01
  end
end
