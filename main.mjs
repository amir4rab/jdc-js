"use strict";

import { getNowruz, convertDate } from "./utilities/convert.mjs";
import { getMonth, isLeap } from "./utilities/jalaali.mjs";

/**
 * **Jalaali Date Convertor**, Set of utilities for converting Jalaali dates into Gregorian Dates.
 */
const JDC = {
  getNowruz,
  getMonth,
  leap: isLeap,
  convert: convertDate,
};

export default JDC;
