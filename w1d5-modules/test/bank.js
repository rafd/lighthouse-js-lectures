var assert = require("chai").assert;
var bank = require("../lib/bank");

describe("bank", function() {
  describe("#createAccount()", function() {
    it("a new account should have a balance", function() {
      var account = bank.createAccount();
      assert.property(account, "balance");
      assert.equal(account.balance, 0);
    });
  });

  describe("account", function() {
    var account;

    beforeEach(function() {
      account = bank.createAccount();
    });

    describe("#depositFunds()", function() {
      it("increases balance by amount", function() {
        account.depositFunds(1000);
        assert.equal(account.balance, 1000);
      });
    });

    describe("#withdrawFunds()", function() {
      it("decreases balance by amount", function() {
        account.depositFunds(1000);
        account.withdrawFunds(50);
        assert.equal(account.balance, 950);
      });
      it("does not withdraw when insufficient funds", function() {
        account.withdrawFunds(50);
        assert.equal(account.balance, 0);
      });
    });
  });
});
