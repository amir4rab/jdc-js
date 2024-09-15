/** Array of years which breaks the 33-year Jalaali cycles */
export const cycleBreakers: number[];

/** Length of the jalaali months */
export const jalaaliMonths: { common: number[]; leap: number[] };

/** Checks if the provided Jalaali year is a leap year */
export declare function isLeap(year: number): [boolean, null | Error];

/** Calculates the number of Jalaali leap years until the provided value */
export declare function leapYearsUntil(year: number): number;

/** Returns the length of the month based on whether the provided year is a leap year or a common one  */
export declare function getMonth(
  year: number,
  month: number
): [number, null | Error];
