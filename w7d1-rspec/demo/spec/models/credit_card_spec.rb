require 'rails_helper'

RSpec.describe CreditCard, type: :model do
  context "new" do
    before :each do 
      @init_limit = 5000
      @cc = CreditCard.new(@init_limit)
    end

    it "returns a CreditCard instance" do
      expect(@cc).to be_a(CreditCard)
    end

    it "can read balance" do
      expect(@cc.balance).to eq(0)
    end

    it "can read limit" do
      expect(@cc.limit).to eq(@init_limit)
    end

    it "can read credit_available" do
      expect(@cc.credit_available).to eq(@init_limit)
    end
    
  end

  context "purchase" do
    context "single purchase" do
      before :each do 
        @limit = 5000
        @price = 100
        @cc = CreditCard.new(@limit)
        product = double("product")
        expect(product).to receive(:price).at_least(1).times.and_return(@price)
        @cc.purchase(product)
      end

      it "doesn't change limit" do
        expect(@cc.limit).to eq(@limit)
      end

      it "increases balance by item price" do
        expect(@cc.balance).to eq(@price)
      end

      it "decreases credit available by item price" do
        expect(@cc.credit_available).to eq(@limit - @price)
      end

    end

    context "multiple purchases" do
      before :each do
        @limit = 5000
        @price = 1000
        @cc = CreditCard.new(@limit)

        product = double("product")
        expect(product).to receive(:price).at_least(1).times.and_return(@price)

        @cc.purchase(product)
        @cc.purchase(product)
      end

      it "doesn't change limit" do
        expect(@cc.limit).to eq(@limit)
      end

      it "increases balance by item price" do
        expect(@cc.balance).to eq(2*@price)
      end

      it "decreases credit available by item price" do
        expect(@cc.credit_available).to eq(@limit - 2*@price)
      end

    end

    context "insufficient credit" do
      before :each do 
        @limit = 100
        @cc = CreditCard.new(@limit)

        @product = double("product")
        expect(@product).to receive(:price).at_least(1).times.and_return(200)
      end

      it "returns exception when trying to purchase without available credit" do
        expect { @cc.purchase(@product) }.to raise_error(CreditCard::InsufficientCreditAvailableException)
        expect(@cc.balance).to eq(0)
        expect(@cc.credit_available).to eq(@limit)
        expect(@cc.limit).to eq(@limit)
      end

    end
  end
end
