const express = require('express');
const fs = require('fs');
const config = require('config');
const Rules = require('../models/rules');
const Transactions = require('../models/transactions');
const router = express.Router();

// Permutates over inputArr
const permutator = (inputArr) => {
  let result = [];

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };

  permute(inputArr);

  return result;
};

const calcRewards = (transactions, rulesPermutation) => {
  const transactionsCopy = JSON.stringify(transactions);
  const bestReward = { rewardPoints: 0 };

  rulesPermutation.forEach((ruleArr) => {
    const transactions = new Transactions(JSON.parse(transactionsCopy));
    const curRules = new Rules(ruleArr);

    const { rewardPoints, rulesApplied } =
      curRules.calculateReward(transactions);
    if (rewardPoints > bestReward.rewardPoints) {
      bestReward['rewardPoints'] = rewardPoints;
      bestReward['rulesApplied'] = rulesApplied;
    }
  });
  return bestReward;
};

// @route       POST /api/rewards/
// @desc        Calculate rewards based on given transaction records
// @access      Public
router.post('/', async (req, res) => {
  try {
    const rules = JSON.parse(fs.readFileSync(config.get('path_to_rules')));
    const rulesPermutation = permutator(rules.rules);
    const transactions = req.body.transactions;
    // Calculate rewards from all transactions
    const rewardFromAll = calcRewards(transactions, rulesPermutation);

    // Calculate rewards from single transaction
    const rewardsFromSingle = {};
    transactions.forEach((transaction) => {
      const bestReward = calcRewards([transaction], rulesPermutation);
      rewardsFromSingle[transaction.id] = bestReward;
    });

    // Return both calculated rewards
    return res.json({
      rewardFromAll,
      rewardsFromSingle,
    });
  } catch (err) {
    res.status(500, 'Internal Server Error');
  }
});

module.exports = router;
