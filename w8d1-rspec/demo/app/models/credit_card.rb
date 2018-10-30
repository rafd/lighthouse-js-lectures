class CreditCard < ApplicationRecord
  attr_reader :balance, :limit

  class InsufficientCreditAvailableException < StandardError
  end

  def initialize(limit)
    @limit = limit
    @balance = 0
  end

  def credit_available
    @limit - @balance
  end

  def purchase(item)
    if credit_available > item.price
      @balance += item.price
    else
      raise InsufficientCreditAvailableException
    end
  end
end

