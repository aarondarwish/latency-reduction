# Betting Odds Validator (Async Await task)

A Node.js application that validates accumulator bets by checking user risk, outcome odds, and accumulator risk.

## Overview

Accumulator bets are a popular product that allows users to increase their odds by betting on multiple outcomes. The odds for each outcome are multiplied together to calculate the total odds. This project contains a function that validates accumulator bets by performing the following tasks:

1. Check whether the user is able to bet (e.g., they have enough money).
2. Retrieve the odds for each outcome.
3. Check whether the business is happy to accept each odd individually (based on the risk).
4. Calculate the accumulator odds.
5. Check whether the business is happy to accept the accumulator odds (based on the total risk).

## Getting Started

### Prerequisites

- Node.js

### Installation

1. Clone the repository:

## Files

- `API.ts`: Contains mock API functions that simulate external service calls.
- `jest.config.js`: Configuration file for Jest testing framework.
- `package.json`: Contains metadata about the project and scripts for running tests.
- `Validator.spec.ts`: Test suite for the `validateAccumulator` function.
- `Validator.ts`: Main logic for the accumulator validation.

## Task

The main task is to optimize the `validateAccumulator` function in `Validator.ts` to minimize the latency from the mock API calls.
