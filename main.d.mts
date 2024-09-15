import { getNowruz, convertDate } from "./utilities/convert.mjs";
import { getMonth, isLeap } from "./utilities/jalaali.mjs";

/**
 * **Jalaali Date Convertor**, Set of utilities for converting Jalaali dates into Gregorian Dates.
 */
declare const JDC: {
  getNowruz: typeof getNowruz;
  getMonth: typeof getMonth;
  leap: typeof isLeap;
  convert: typeof convertDate;
};

export default JDC;
