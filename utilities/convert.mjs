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
 * Calculates the difference of leap years of Jalaali Calender and Gregorian Calender until the given year
 * @param {int} year
 * @returns {int}
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
 * Calculates the day of Nowruz in UNIX milliseconds
 * @param {int} year
 * @returns {[int, null | Error]}
 */
export const getNowruz = (year) => {
  // Validating the type of year
  if (typeof year !== "number") {
    return [false, new Error("The year variable must be a number")];
  }

  // Validating the value of year
  if (
    year < cycleBreakers[0] ||
    year >= cycleBreakers[cycleBreakers.length - 1]
  ) {
    return [false, new Error("The provided year falls out of supported years")];
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
 * Converts the given Jalaali date into the UNIX milliseconds equivalent
 * @param {number} year
 * @param {number} month
 * @param {number} day
 * @returns {[int, null | Error]}
 */
export const convertDate = (year, month, day) => {
  // Validating the input types
  if (
    typeof year !== "number" ||
    typeof month !== "number" ||
    typeof day !== "number"
  )
    return [0, new Error("The provided values must be numbers")];

  // Validating the value of year
  if (year < cycleBreakers[0] || year > cycleBreakers[cycleBreakers.length - 1])
    return [0, new Error("The provided year is out of the valid range")];

  // Validating the value of month
  if (month < 1 || month > 12)
    return [0, new Error("The provided month is out of the valid range")];

  // Checking if the current year is a leap year
  const leap = isLeap(year);
  const months = leap ? jalaaliMonths.leap : jalaaliMonths.common;

  // Validating the value of day
  if (day < 1 || day > months[month]) {
    return [0, new Error("Provided day is out of the valid range")];
  }

  // Getting the timestamp of Nowruz day
  let [nowruzTimestamp, err] = getNowruz(year);
  if (err !== null) {
    return [0, err];
  }

  /** Total days since Nowruz */
  let daysSinceNowruz = 0;

  // Adding the length of each past month
  for (let i = 0; i < month - 1; i++) {
    daysSinceNowruz += months[i];
  }

  // Adding the total number of days in the current month
  daysSinceNowruz += day - 1;

  // Adding the day's value to the Nowruz timestamp
  nowruzTimestamp += msInDay * daysSinceNowruz;

  return [nowruzTimestamp, null];
};
