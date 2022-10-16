class Transactions {
  constructor(transactions) {
    this.rewardPoints = 0;
    this.transactions = {};
    // make a copy of transactions data
    const transactionsCopy = JSON.parse(JSON.stringify(transactions));
    if (transactionsCopy instanceof Array) {
      transactionsCopy.forEach((transaction) => {
        const { merchant_code, amount_cents } = transaction;
        this.transactions[merchant_code] =
          merchant_code in this.transactions
            ? this.transactions[merchant_code] + amount_cents
            : amount_cents;
      });
    } else {
      this.transactions = transactionsCopy;
    }
  }

  // Apply a rule as many times as possible
  applyRule = (rule) => {
    while (rule.applyOn(this)) {}
  };
}

module.exports = Transactions;
