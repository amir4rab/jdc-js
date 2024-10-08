/**
 * This file contains Utilities for Converting a
 * Jalaali date into the UNIX milliseconds timestamp
 */

import {
  cycleBreakers,
  jalaaliMonths,
  isLeap,
  leapYearsUntil,
} from "./jalaali.mjs";
import {
  gregorianLeapYearsUntil,
  jalaaliEpochInCommonEra,
} from "./gregorian.mjs";

// Error Responses
import { errors } from "./errors.mjs";

/** ---------------- **/
/** -- Vairables  -- **/
/** ---------------- **/

/**
 * Milliseconds in one day
 * 24h * 60m * 60s * 1000ms
 */
const msInDay = 24 * 60 * 60 * 1000;

/** ---------------- **/
/** -- Utilites   -- **/
/** ---------------- **/

/**
 * @param {number} year
 * @returns {number}
 */
const diffInLeapYears = (year) => {
  const jalaaliLeapYears = leapYearsUntil(year);
  const gregorianLeapYears = gregorianLeapYearsUntil(
    year + jalaaliEpochInCommonEra
  );

  const diff = jalaaliLeapYears - gregorianLeapYears;

  return diff;
};

/**
 * @param {number} year
 * @returns {[number, null | Error]}
 */
export const getNowruz = (year) => {
  // Validating the type of year
  if (typeof year !== "number") {
    return [false, new Error(errors.expectedToBeNumber)];
  }

  // Validating the value of year
  if (
    year < cycleBreakers[0] ||
    year >= cycleBreakers[cycleBreakers.length - 1]
  ) {
    return [false, new Error(errors.outOfRangeYear)];
  }

  const leapYears = diffInLeapYears(year);
  const nowruz = 6 + leapYears;

  // Converting the Nowruz date into a string
  const nowruzStr = nowruz.toString().padStart(2, "0");

  // Getting the timestamp of the Nowruz day
  const nowruzTimestamp = new Date(
    year + jalaaliEpochInCommonEra + "-03-" + nowruz
  ).valueOf();

  return [nowruzTimestamp, null];
};

/**
 * @param {number} year
 * @param {number} month
 * @param {number} day
 * @returns {[number, null | Error]}
 */
export const convertDate = (year, month, day) => {
  // Validating the input types
  if (
    typeof year !== "number" ||
    typeof month !== "number" ||
    typeof day !== "number"
  )
    return [0, new Error(errors.expectedToBeNumber)];

  // Validating the value of year
  if (year < cycleBreakers[0] || year > cycleBreakers[cycleBreakers.length - 1])
    return [0, new Error(errors.outOfRangeYear)];

  // Validating the value of month
  if (month < 0 || month > 11) return [0, new Error(errors.outOfRangeMonth)];

  // Checking if the current year is a leap year
  const [leap, leapErr] = isLeap(year);
  if (leapErr !== null) {
    return [0, leapErr];
  }

  const months = leap ? jalaaliMonths.leap : jalaaliMonths.common;

  // Validating the value of day
  if (day < 0 || day >= months[month]) {
    return [0, new Error(errors.outOfRangeDay)];
  }

  // Getting the timestamp of Nowruz day
  let [nowruzTimestamp, nowruzErr] = getNowruz(year);
  if (nowruzErr !== null) {
    return [0, nowruzErr];
  }

  /** Total days since Nowruz */
  let daysSinceNowruz = 0;

  // Adding the length of each past month
  for (let i = 0; i <= month - 1; i++) {
    daysSinceNowruz += months[i];
  }

  // Adding the total number of days in the current month
  daysSinceNowruz += day;

  // Adding the day's value to the Nowruz timestamp
  nowruzTimestamp += msInDay * daysSinceNowruz;

  return [nowruzTimestamp, null];
};
