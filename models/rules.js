const Rule = require('./rule');

class Rules {
  constructor(rules) {
    this.rules = [];
    rules.forEach((rule) => {
      this.rules.push(new Rule({ ...rule }));
    });
  }

  // Apply each rule on transactions
  calculateReward = (transactions) => {
    this.rules.forEach((rule) => {
      transactions.applyRule(rule);
    });

    const { rewardPoints, rulesApplied } = transactions;
    return { rewardPoints, rulesApplied };
  };
}

module.exports = Rules;
