import JDC from "../main.mjs";

// Testing utilities
import { expect, test } from "./test.spec.mjs";

/**
 * Included tests:
 *  - Input Validation
 *  - Algorithm Correctness
 *  - Performance metrics
 */
const convertTests = () => {
  console.log(`Executing "convert" tests...\n`);
  let passed = 0;

  test(
    "Input validation",
    () => {
      let [_, err] = [0, null];

      //** ------------------------- **//
      //** -- Invalid types       -- **//
      //** ------------------------- **//
      [_, err] = JDC.convert("  ", 10, 10);
      expect(err).toBeError();

      [_, err] = JDC.convert(1400, "", 10);
      expect(err).toBeError();

      [_, err] = JDC.convert(1400, 10, "");
      expect(err).toBeError();

      //** ------------------------- **//
      //** -- Invalid year value  -- **//
      //** ------------------------- **//
      [_, err] = JDC.convert(4000, 1, 1);
      expect(err).toBeError();

      [_, err] = JDC.convert(-100, 1, 1);
      expect(err).toBeError();

      //** ------------------------- **//
      //** -- Invalid month value -- **//
      //** ------------------------- **//
      [_, err] = JDC.convert(1403, 14, 1);
      expect(err).toBeError();

      [_, err] = JDC.convert(1403, 0, 1);
      expect(err).toBeError();

      //** ------------------------- **//
      //** -- Invalid day value   -- **//
      //** ------------------------- **//
      [_, err] = JDC.convert(1403, 1, 32);
      expect(err).toBeError();

      [_, err] = JDC.convert(1403, 1, 0);
      expect(err).toBeError();
    },
    (successful) => {
      successful && passed++;
    }
  );

  test(
    "Converting algorithm",
    () => {
      let [timestamp, err] = [0, null];
      let date = new Date();

      //** ------------------------------- **//
      //** -- Javascript Release Date   -- **//
      //** ------------------------------- **//
      [timestamp, err] = JDC.convert(1374, 9, 13);
      date = new Date(timestamp);

      expect(err).toBeNull();
      expect(date.toLocaleDateString("en", { year: "numeric" })).toBe("1995");
      expect(date.toLocaleDateString("en", { month: "numeric" })).toBe("12");
      expect(date.toLocaleDateString("en", { day: "numeric" })).toBe("4");

      //** ------------------------------- **//
      //** -- Chrome v8 Release Date    -- **//
      //** ------------------------------- **//
      [timestamp, err] = JDC.convert(1387, 6, 12);
      date = new Date(timestamp);

      expect(err).toBeNull();
      expect(date.toLocaleDateString("en", { year: "numeric" })).toBe("2008");
      expect(date.toLocaleDateString("en", { month: "numeric" })).toBe("9");
      expect(date.toLocaleDateString("en", { day: "numeric" })).toBe("2");

      //** ------------------------------- **//
      //** -- Node JS Release Date      -- **//
      //** ------------------------------- **//
      [timestamp, err] = JDC.convert(1388, 3, 6);
      date = new Date(timestamp);

      expect(err).toBeNull();
      expect(date.toLocaleDateString("en", { year: "numeric" })).toBe("2009");
      expect(date.toLocaleDateString("en", { month: "numeric" })).toBe("5");
      expect(date.toLocaleDateString("en", { day: "numeric" })).toBe("27");

      //** ------------------------------- **//
      //** -- React JS Release Date     -- **//
      //** ------------------------------- **//
      [timestamp, err] = JDC.convert(1392, 3, 8);
      date = new Date(timestamp);

      expect(err).toBeNull();
      expect(date.toLocaleDateString("en", { year: "numeric" })).toBe("2013");
      expect(date.toLocaleDateString("en", { month: "numeric" })).toBe("5");
      expect(date.toLocaleDateString("en", { day: "numeric" })).toBe("29");
    },
    (successful) => {
      successful && passed++;
    }
  );

  test(
    "Performance Metrics",
    () => {
      const jalaaliDates = [];
      const results = [];
      const itemsCount = 500;

      // Creating random dates
      for (let i = 0; i < itemsCount; i++) {
        // Creating a random Jalaali date
        const year = Math.trunc(Math.random() * 2000);
        const month = Math.max(Math.trunc(Math.random() * 12), 1);
        const day = Math.max(Math.trunc(Math.random() * 28), 1);

        // Appending it to the array
        jalaaliDates.push([year, month, day]);
      }

      // Converting each date to a Gregorian date
      // and storing both value and timestamp
      for (let i = 0; i < itemsCount; i++) {
        const st = performance.now();
        const result = JDC.convert(...jalaaliDates[i]);
        const et = performance.now();

        results.push({ result, st, et });
      }

      let errCount = 0;
      let totalComputeTime = 0;

      // Finding the total execution time and error count
      results.forEach(({ et, result, st }) => {
        totalComputeTime += et - st;
        if (result[1] !== null) errCount++;
      });

      // Expecting the error count to be 0
      expect(errCount).toBe(0);

      // Calculating the average compute time in microseconds
      const averageComputeDuration = (
        (totalComputeTime / itemsCount) *
        1000
      ).toFixed(0);

      // Logging the results
      console.log(`
Performance Metrics:
  - Avrage compute per item: ${averageComputeDuration} microseconds
  - Total compute for ${itemsCount} items: ${totalComputeTime.toFixed(2)}ms
  - Error count: ${errCount}
      `);
    },
    (successful) => {
      successful && passed++;
    }
  );

  if (passed !== 3) {
    console.error("[convert tests]: Didn't pass all the tests\n\n");
  } else {
    console.log(`[convert tests]: passed ${passed}/3\n\n`);
  }
};

export default convertTests;
