const Requirement = require('./requirement');

class Rule {
  constructor(rule) {
    const { id, requirements, reward } = rule;
    this.id = id;
    this.requirements = [];
    requirements.forEach((requirement) => {
      const { merchant_code, amount_cents } = requirement;
      this.requirements.push(new Requirement(merchant_code, amount_cents));
    });
    this.reward = reward;
  }

  applyOn = (transactionsObj) => {
    const { transactions } = transactionsObj;

    // If this rule matches all the merchant_code, check all merchant_codes
    if (this.requirements[0].merchant_code === 'all') {
      const amount_cents = this.requirements[0].amount_cents;
      for (const merchant_code in transactions) {
        if (transactions[merchant_code] >= amount_cents) {
          transactions[merchant_code] -= amount_cents;
          transactionsObj.rewardPoints += this.reward;
          return true;
        }
      }
      return false;
    } else {
      // else, this rule targets specific merchant_code

      // Check if transactions satisfy all requirements in this rule
      for (const requirement of this.requirements) {
        const { merchant_code, amount_cents } = requirement;

        if (
          !(merchant_code in transactions) ||
          transactions[merchant_code] < amount_cents
        ) {
          return false;
        }
      }

      // Update rewardPoints and remaining transactions
      this.requirements.forEach((req) => {
        const { merchant_code, amount_cents } = req;
        transactions[merchant_code] -= amount_cents;
      });

      transactionsObj.rewardPoints += this.reward;

      return true;
    }
  };
}

module.exports = Rule;
