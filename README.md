# Betting Odds Validator (Async Await task)

A Node.js application that validates accumulator bets by checking user risk, outcome odds, and accumulator risk.

## Overview

Accumulator bets are a popular product that allows users to increase their odds by betting on multiple outcomes. The odds for each outcome are multiplied together to calculate the total odds. This project contains a function that validates accumulator bets by performing the following tasks:

1. Check whether the user is able to bet (e.g., they have enough money).
2. Retrieve the odds for each outcome.
3. Check whether the business is happy to accept each odd individually (based on the risk).
4. Calculate the accumulator odds.
5. Check whether the business is happy to accept the accumulator odds (based on the total risk).

## Files

- `API.ts`: Contains mock API functions that simulate external service calls.
- `jest.config.js`: Configuration file for Jest testing framework.
- `package.json`: Contains metadata about the project and scripts for running tests.
- `Validator.spec.ts`: Test suite for the `validateAccumulator` function.
- `Validator.ts`: Main logic for the accumulator validation.

## Tasks

### Estimate how long each test will take to run.

Given the structure of our application and the mock latencies defined in `API.ts`, we can estimate the latency for each test case in `Validator.spec.ts`.

### Test Case 1: Should reject bets from user 1

- `validateUserRisk`: 0.1s (latency for user ID 1)
- Total estimated time: 0.1s

### Test Case 2: Should accept bets from user 2

- `validateUserRisk`: 0.1s (latency for user ID 2)
- `getOutcomeOdds`: 0.1s * 2 outcomes = 0.2s
- `validateOdd`: 0.1s * 2 outcomes = 0.2s
- `validateAccumulatorRisk`: 0.1s
- Total estimated time: 0.6s

### Test Case 3: Should reject outcome 11

- `validateUserRisk`: 0.1s (latency for user ID 2)
- `getOutcomeOdds`: 0.1s * 2 outcomes = 0.2s
- `validateOdd`: 0.1s * 2 outcomes = 0.2s (0.1s latency will be for outcome 11, which will reject the bet)
- Total estimated time: 0.5s

### Test Case 4: Should reject this outcome combination

- `validateUserRisk`: 0.1s (latency for user ID 2)
- `getOutcomeOdds`: 0.1s * 4 outcomes = 0.4s
- `validateOdd`: 0.1s * 4 outcomes = 0.4s
- `validateAccumulatorRisk`: 0.1s
- Total estimated time: 1.0s

### Main task
The primary task is to optimise the `validateAccumulator` function in `Validator.ts` to minimise the latency arising from the mock API calls.




