/**
 * This file contains variables and helpers for working
 * with the Jalaali calendar.
 */

/** ---------------- **/
/** -- Vairables  -- **/
/** ---------------- **/

/**
 * Array of years which breaks the 33-year Jalaali cycles
 * @type {number[]}
 */
export const cycleBreakers = [
  -61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097, 2192,
  2262, 2324, 2394, 2456, 3178,
];

/** Length of the Jalaali calendar cycles */
const cycleLength = 33;

/**
 * Length of the jalaali months
 * @type {{ common: number[], leap: number[]}}
 */
export const jalaaliMonths = {
  common: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29],
  leap: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 30],
};

/** ---------------- **/
/** -- Utilites   -- **/
/** ---------------- **/

/**
 * Checks if the provided Jalaali year is a leap year
 * @param {number} year
 * @returns {boolean}
 */
export const isLeap = (year) => {
  // Validating the type of user input
  if (typeof year !== "number") return false;

  // Validating the range of user input
  if (
    year <= cycleBreakers[0] ||
    year >= cycleBreakers[cycleBreakers.length - 1]
  )
    return false;

  let previousBreak = -1;

  // Finding previous and next break years
  for (const breakYear of cycleBreakers) {
    if (year <= breakYear) break;
    previousBreak = breakYear;
  }

  // Calculating the time since the last break
  const sinceLastBreak = year - previousBreak;

  // Applying the formula to the years since the break
  const reminder = (sinceLastBreak + 1) % cycleLength;

  // Checking if the year is a leap year
  const isLeap = (reminder - 1) % 4 == 0;

  return isLeap;
};

/**
 * Calculates the number of Jalaali leap years until the provided value
 * @param {number} year
 * @returns {number}
 */
export const leapYearsUntil = (year) => {
  // Validating the type of user input
  if (typeof year !== "number") return 0;

  // Validating the range of user input
  if (
    year <= cycleBreakers[0] ||
    year >= cycleBreakers[cycleBreakers.length - 1]
  )
    return 0;

  /** Total number of leap years from epoch until the provided year */
  let leaps = 0;

  /** Previous break year */
  let previousBY = 0;
  /** Next break year */
  let nextBY = 0;

  for (let i = 0; i < cycleBreakers.length; i++) {
    // Breaking if we have reached the last break
    if (i + 1 >= cycleBreakers.length) return 0;

    // Storing the previous and the next break
    previousBY = cycleBreakers[i];
    nextBY = cycleBreakers[i + 1];

    // Breaking early if the current year resides between the previous and the next break years
    if (year >= previousBY && year < nextBY) break;

    // Claculating the number of leap years between two breaks
    const diff = nextBY - previousBY;
    const dividend = Math.trunc(diff / cycleLength);
    const reminder = diff % cycleLength;

    // Adding the number of leap years to the total leap years
    leaps += 8 * dividend + Math.trunc(reminder / 4);
  }

  // Calculating the number of leap years between the previous break and the current year
  const diff = year - previousBY;
  let k = 0;
  if (year + 4 >= nextBY) k++;

  const dividend = Math.trunc(diff / cycleLength);
  const reminder = diff % cycleLength;

  // Adding the leap years to the total leap years
  leaps += 8 * dividend + Math.trunc((reminder + 3) / 4) + k;

  return leaps;
};
