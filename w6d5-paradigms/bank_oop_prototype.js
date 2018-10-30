/* setup */

function Account(owner) {
  this.owner = owner;
  this.balance = 0;
  this.transactions = [];
}

Account.prototype.deposit = function(amount) {
  this.balance += amount;
  this.transactions.push(`D${amount}`)
}

Account.prototype.withdraw = function(amount) {
  this.balance -= amount;
  this.transactions.push(`W${amount}`)
}

Account.prototype.log = function() {
  console.log(`${this.owner}: $${this.balance}`);
  for(let transaction of this.transactions) {
    console.log("\t"+transaction);
  }
  console.log();
}

/* SavingsAccount */

function SavingsAccount(owner) {
  Account.call(this, owner);
}
SavingsAccount.prototype = Object.create(Account.prototype,
  {
    withdraw: {
       value: function(amount) {
         if(this.balance - amount > 0) {
           Account.prototype.withdraw.apply(this, [amount]);
         } else {
           this.transactions.push(`W${amount}X`)
         }
       },
      enumerable: true,
      configurable: true,
      writable: true
    }
  }
);

SavingsAccount.prototype.constructor = SavingsAccount;







/* program */

let accountABC = new SavingsAccount("Bob");

accountABC.deposit(500);
accountABC.withdraw(100);
accountABC.withdraw(1000);

accountABC.log();


/* or */

new SavingsAccount("Bob")
      .deposit(500)
      .withdraw(100)
      .withdraw(1000)
      .log();
