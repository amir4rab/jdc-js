/**
 * This file contains variables and helpers for working 
 * with the Gregorian calendar.
 */

/**
 * Jalaali calendar epoch after the Gregorian Common Era
 * @type {number}
 */
export const jalaaliEpochInCommonEra = 621;

/**
 * Number of leap years before the Jalaali calendar epoch
 * @type {number}
 */
export const leapsBeforeJalaaliEpoch = 150;

/**
 * Number of Gregorian leap years until the given year
 * @param {number} year
 * @returns {number}
 */
export const gregorianLeapYearsUntil = (year) => {
  const potentialLeaps = Math.trunc(year / 4);
  const commonYears = Math.trunc(year / 100);
  const leapsYears = Math.trunc(year / 400);

  return potentialLeaps - commonYears + leapsYears - leapsBeforeJalaaliEpoch;
};
