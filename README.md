# Capital One Technical Assessment - Intern Fall 2022

## Introduction

This `Express.js` backend is created for Capital One's new grad software engineer assessment. Before I start, I'd like to thank you for taking the time review my submission!

## Setup

- To run this locally, run the following commands from within the top-level directory:

  ```
  npm install && npm run start
  ```

- To test this locally, run the following command:

  ```
  npm run test
  ```

## Repository Layout and Guidelines

This repository consists of multiple directories, including the main backend Express Api, models, a `jest` test module, and transactions/rules mocks for `jest`.

- `./server.js` - the index file of the backend server. running `npm run start` will essentially run `node server.js`.
- `./routes/` - contains the Api routes of the backend service.
- `./models/` - contains four classes used to calculate the maximum rewards
  - `class Rule` - represents one single rule. `Rule.reduce(transactions)` can apply the rule on a set of transactions exactly once if possible, and increments the transactions' rewards accordingly.
  - `class Rules` - contains a set of `Rule` (by default, there are 7 rules). `Rules.calculateReward(transactions)` applies each of its rules on the transactions in order.
  - `class Transactions` - contains all the transactions. `Transactions.applyRule(rule)` applies one rule on itself as many time as possible.
  - `class Requirements` - contains the `merchant_code` and `amount_cents` of one piece of requirement in a rule. A rule may have more than one requirements.
- `./tests` - contains a `jest` module.
  - `./tests/integration/` - contains the integration tests of the Api endpoint.
  - `./tests/unit` - due to time limits, unit tests are omitted for now.
- `./mocks` - contains mockup transactions and rules used for testing.

## Api Endpoint

There is currently only one Api Endpoint, `POST /api/reward`. This endpoint expects the following input format in the request payload:

- `transactions` - an array of transaction records.
- (optional) `rules` - an array of rules that can be applied

Example JSON files of `transactions` and `rules` can be found in `./mocks`.

After taking the payload, this Api will create a permutation of different orders of rules to be applied with (e.g. Apply rule 6 first, then rule 3, then rule 4, ...), and calculate the reward points with each permutation of rules. Meanwhile, it will keep track of the max reward points among all premutations, and return it in `response`.

## Why Permutation?

You may wonder, why did I choose to use a permutation of different orders to apply these rules? (We all know permutation is not efficient!) I chose to do it in this way because I believe that rules in a reward points system can be modified. Therefore, working hard to get the optimal order for the current set of rules is not very meaningful in the long term. After all, it's a waste of human power to re-calculate the optimal solution each time a rule is added or deleted.

## What about Scalability?

You may wonder again, what about scalability? The size of the permutation grows fast along with the given number of rules. In my opinion, this single-threaded solution should work fine for now (with only 7 rules). If, say, the number of available rules increase dramatically in the future, we could always leverage the magic of `multi-threading` with Javascript's [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) to conduct computation-heavy workloads like this.
