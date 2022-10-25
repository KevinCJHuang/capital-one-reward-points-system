## First approach: Permutation

Permutation of three rules would give the following.

```
[
  [1,2,3] => Apply rule 1 as many times as possible, then rule 2, then rule 3.
  [1,3,2]
  [2,1,3]
  [2,3,1]
  [3,1,2]
  [3,2,1]
]
```

## Second approach: Permutation with DP

Permutation of three rules with DP would give the following

```
[
  Map(1) {
    '[]' => { remainingTransactions: [Array], rewardPoints: 0 }
  },
  Map(3) {
    '[1]' => { remainingTransactions: [Object], rewardPoints: 0 },
    '[2]' => { remainingTransactions: [Object], rewardPoints: 300 },
    '[3]' => { remainingTransactions: [Object], rewardPoints: 200 }
  },
  Map(6) {
    '[3,1]' => { remainingTransactions: [Object], rewardPoints: 200 },
    '[2,1]' => { remainingTransactions: [Object], rewardPoints: 300 },
    '[1,2]' => { remainingTransactions: [Object], rewardPoints: 300 },
    '[3,2]' => { remainingTransactions: [Object], rewardPoints: 200 },
    '[1,3]' => { remainingTransactions: [Object], rewardPoints: 200 },
    '[2,3]' => { remainingTransactions: [Object], rewardPoints: 300 }
  },
  Map(6) {
    '[2,3,1]' => { remainingTransactions: [Object], rewardPoints: 300 },
    '[3,2,1]' => { remainingTransactions: [Object], rewardPoints: 200 },
    '[3,1,2]' => { remainingTransactions: [Object], rewardPoints: 200 },
    '[1,3,2]' => { remainingTransactions: [Object], rewardPoints: 200 },
    '[2,1,3]' => { remainingTransactions: [Object], rewardPoints: 300 },
    '[1,2,3]' => { remainingTransactions: [Object], rewardPoints: 300 }
  }
]
```
