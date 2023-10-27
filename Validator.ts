import { validateUserRisk, getOutcomeOdds, validateOdd, validateAccumalatorRisk } from "./API";

export interface User{
  id: number,
}

export interface AccumalatorRequest{
  user: User;
  outcomeIds: number[];
}

export interface AccumalatorResponse{
  accumalatorOdds?: number, 
  accept: boolean,
}

export const validateAccumalator = async(accumalatorRequest: AccumalatorRequest): Promise<AccumalatorResponse> => {
  const validUser = await validateUserRisk(accumalatorRequest.user.id);
  if (!validUser) {
    return {
      accept: false,
    };
  }

  const oddsPromises = accumalatorRequest.outcomeIds.map(getOutcomeOdds);
  const odds = await Promise.all(oddsPromises);

  const validOddsPromises = odds.map(validateOdd);
  const validOddsResults = await Promise.all(validOddsPromises);

  const validOdds = validOddsResults.every(result => result);
  if (!validOdds) {
    return {
      accept: false,
    };
  }

  const accumalatorOdds = odds.reduce((a, b) => a * b);
  const validAccumalatorRisk = await validateAccumalatorRisk(accumalatorOdds);
  if (!validAccumalatorRisk) {
    return {
      accumalatorOdds,
      accept: false,
    };
  }

  return {
    accumalatorOdds,
    accept: true,
  };
};
