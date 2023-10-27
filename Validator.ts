import {
  validateUserRisk,
  getOutcomeOdds,
  validateOdd,
  validateAccumalatorRisk,
} from './API';

export interface User {
  id: number;
}

export interface AccumalatorRequest {
  user: User;
  outcomeIds: number[];
}

export interface AccumalatorResponse {
  accumalatorOdds?: number;
  accept: boolean;
}

export const validateAccumalator = async (
  accumalatorRequest: AccumalatorRequest
): Promise<AccumalatorResponse> => {
  const validUserPromise = validateUserRisk(accumalatorRequest.user.id);

  const oddsPromises = accumalatorRequest.outcomeIds.map(getOutcomeOdds);
  const odds = await Promise.all(oddsPromises);

  const validOddsPromises = odds.map(validateOdd);
  const validOddsResults = await Promise.all(validOddsPromises);
  const validOdds = validOddsResults.every(Boolean);

  const accumalatorOdds = odds.reduce((a, b) => a * b);
  const validAccumalatorRiskPromise = validateAccumalatorRisk(accumalatorOdds);

  const [validUser, validAccumalatorRisk] = await Promise.all([
    validUserPromise,
    validAccumalatorRiskPromise,
  ]);

  return {
    accumalatorOdds,
    accept: validAccumalatorRisk && validOdds && validUser,
  };
};
