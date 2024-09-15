/** Calculates the difference of leap years of Jalaali Calender and Gregorian Calender until the given year */
declare function diffInLeapYears(year: number): number;

/** Calculates the day of Nowruz in UNIX milliseconds */
export declare function getNowruz(year: number): [number, null | Error];

/** Converts the given Jalaali date into the UNIX milliseconds equivalent */
export declare function convertDate(
  year: number,
  month: number,
  day: number
): [number, null | Error];
