const express = require('express');
const fs = require('fs');
const config = require('config');

const Transactions = require('../models/transactions');
const Rule = require('../models/rule');
const permutate = require('../utils/permutator');

const router = express.Router();

// Calculates the max reward based on input transactions and permutation
// of rules
const calcRewards = (transactionsData, rules) => {
  // Initialize dp array. The dp array is an array of Maps with this structure:
  // - key:     a string representation of an array
  // - values:  { remainingTransactions, rewardPoints }
  const initialMap = new Map();
  initialMap.set('[]', {
    remainingTransactions: transactionsData,
    rewardPoints: 0,
  });
  dp = [initialMap];

  // Iterate through different length of rulesets from 1...n
  for (var i = 1; i < rules.length + 1; i++) {
    dp.push(new Map());

    // Permutation of all rules with lenght i.
    const rulesPermutation = permutate(rules, i);

    rulesPermutation.forEach((ruleSet) => {
      // Split ruleSet into [1...n-1], and n
      const newRule = ruleSet.pop();
      const prevRulesIds = ruleSet.map((rule) => rule.id);

      // Get previous remaining transactions and best results
      const { remainingTransactions, rewardPoints } = dp[i - 1].get(
        JSON.stringify(prevRulesIds)
      );

      // Create transaction object, and apply the new rule
      transactionsObj = new Transactions(remainingTransactions);
      transactionsObj.applyRule(new Rule(newRule));

      // Push results onto dp array
      dp[i].set(JSON.stringify([...prevRulesIds, newRule.id]), {
        remainingTransactions: transactionsObj.transactions,
        rewardPoints: rewardPoints + transactionsObj.rewardPoints,
      });
    });
  }

  // Find and return max reward points
  var maxRewardPoints = 0;
  for (const [key, value] of dp[rules.length]) {
    maxRewardPoints = Math.max(maxRewardPoints, value['rewardPoints']);
  }
  return maxRewardPoints;
};

// @route       POST /api/rewards/
// @desc        Calculate rewards based on given transaction records
// @access      Public
router.post('/', async (req, res) => {
  try {
    // Parse rules and transactions
    const rules =
      req.body.rules ??
      JSON.parse(fs.readFileSync(config.get('PATH_TO_DEFAULT_RULES'))).rules;
    const transactions = req.body.transactions;

    // Calculate rewards from all transactions
    const rewardFromAll = calcRewards(transactions, rules);

    // Calculate rewards from single transaction
    const rewardsFromSingle = {};
    transactions.forEach((transaction) => {
      const bestReward = calcRewards([transaction], rules);
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
