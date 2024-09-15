/** Array of years which breaks the 33-year Jalaali cycles */
export const cycleBreakers: number[];

/** Length of the jalaali months */
export const jalaaliMonths: { common: number[]; leap: number[] };

/** Checks if the provided Jalaali year is a leap year */
export declare function isLeap(year: number): [number, null | Error];

/** Calculates the number of Jalaali leap years until the provided value */
export declare function leapYearsUntil(year: number): number;
