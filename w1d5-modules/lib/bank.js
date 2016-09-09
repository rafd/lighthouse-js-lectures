module.exports = {
  createAccount: function() {
    return {
      balance: 0,
      depositFunds: function(amount) {
        this.balance += amount;
      },
      withdrawFunds: function(amount) {
        if(this.balance - amount < 0){
          console.log("Insufficient Funds");
        } else {
          this.balance -= amount;
        }
      }
    };
  }
}
