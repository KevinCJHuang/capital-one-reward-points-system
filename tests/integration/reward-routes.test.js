// import * as request from 'supertest';
const request = require('supertest');
const app = require('../../server');

const MOCK_DEFAULT_RULES = require('../../mocks/rules/defaultRules.json');
const MOCK_MERCHANT_ALL_RULE = require('../../mocks/rules/merchantAllRule.json');

const MOCK_DEFAULT_TRANSACTIONS = require('../../mocks/transactions/defaultTransactions.json');
const MOCK_LARGE_TRANSACTIONS = require('../../mocks/transactions/largeTransactions.json');

describe('rewardRoutes', () => {
  describe('POST /api/reward', () => {
    it('uses a "merchant_code = all" rule properly', async () => {
      const payload = {
        rules: MOCK_MERCHANT_ALL_RULE.rules,
        transactions: MOCK_DEFAULT_TRANSACTIONS.transactions,
      };

      await request
        .agent(app)
        .post('/api/reward')
        .send(payload)
        .set('Content-type', 'application/json')
        .expect(200)
        .then((res) => {
          expect(res.body.rewardFromAll).toBe(40);
          expect(res.body.rewardsFromSingle.T1).toBe(25);
          expect(res.body.rewardsFromSingle.T2).toBe(10);
          expect(res.body.rewardsFromSingle.T3).toBe(5);
        });
    });

    it('uses a mixed group of rules properly', async () => {
      const payload = {
        rules: MOCK_DEFAULT_RULES.rules,
        transactions: MOCK_DEFAULT_TRANSACTIONS.transactions,
      };

      await request
        .agent(app)
        .post('/api/reward')
        .send(payload)
        .set('Content-type', 'application/json')
        .expect(200)
        .then((res) => {
          expect(res.body.rewardFromAll).toBe(95);
          expect(res.body.rewardsFromSingle.T1).toBe(80);
          expect(res.body.rewardsFromSingle.T2).toBe(10);
          expect(res.body.rewardsFromSingle.T3).toBe(5);
        });
    });
  });
});
