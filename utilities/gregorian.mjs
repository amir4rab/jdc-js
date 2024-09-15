/**
 * This file contains variables and helpers for working
 * with the Gregorian calendar.
 */

export const jalaaliEpochInCommonEra = 621;

export const leapsBeforeJalaaliEpoch = 150;

/**
 * @param {number} year
 * @returns {number}
 */
export const gregorianLeapYearsUntil = (year) => {
  const potentialLeaps = Math.trunc(year / 4);
  const commonYears = Math.trunc(year / 100);
  const leapsYears = Math.trunc(year / 400);

  return potentialLeaps - commonYears + leapsYears - leapsBeforeJalaaliEpoch;
};
