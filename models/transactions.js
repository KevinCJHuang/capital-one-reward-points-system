class Transactions {
  constructor(transactions) {
    this.rewardPoints = 0;
    this.transactions = {};
    this.rulesApplied = {};

    transactions.forEach((transaction) => {
      const { merchant_code, amount_cents } = transaction;
      this.transactions[merchant_code] =
        merchant_code in this.transactions
          ? this.transactions[merchant_code] + amount_cents
          : amount_cents;
    });
  }

  // Apply a rule as many times as possible
  applyRule = (rule) => {
    while (rule.reduce(this)) {}
  };
}

module.exports = Transactions;
