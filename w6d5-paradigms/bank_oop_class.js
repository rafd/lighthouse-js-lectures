/* setup */

class Account {
  constructor(owner) {
    this.owner = owner;
    this.balance = 0;
    this.transactions = [];
  }

  deposit(amount) {
    this.balance += amount;
    this.transactions.push(`D${amount}`)
  }

  withdraw(amount) {
    this.balance -= amount;
    this.transactions.push(`Withdraw ${amount}`)
  }

  log() {
    console.log(`${this.owner}: $${this.balance}`);
    for(let transaction of this.transactions) {
      console.log("\t"+transaction);
    }
    console.log();
  }
}

class SavingsAccount extends Account {

  withdraw(amount) {
    if(this.balance - amount > 0) {
      super.withdraw(amount);
    } else {
      this.transactions.push(`W${amount}X`);
    }
  }
}


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
