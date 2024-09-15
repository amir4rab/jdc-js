import JDC from "../main.mjs";

// Testing utilities
import { expect, test } from "./test.spec.mjs";

/**
 * Included tests:
 *  - Input Validation
 *  - Algorithm Correctness
 *  - Performance metrics
 */
const leapTests = () => {
  console.log(`Executing "leap" tests`);
  let passed = 0;

  test(
    "Input validation",
    () => {
      let [_, err] = [0, null];

      //** ------------------------- **//
      //** -- Invalid types       -- **//
      //** ------------------------- **//
      [_, err] = JDC.leap("");
      expect(err).toBeError();

      //** ------------------------- **//
      //** -- Out of range values -- **//
      //** ------------------------- **//
      [_, err] = JDC.leap(4000);
      expect(err).toBeError();

      [_, err] = JDC.leap(-100);
      expect(err).toBeError();
    },
    (successful) => {
      successful && passed++;
    }
  );

  test(
    "Leap finding correctness",
    () => {
      const leapYears = [
        1354, 1358, 1362, 1366, 1370, 1375, 1379, 1383, 1387, 1391, 1395, 1399,
        1403, 1408, 1412, 1416,
      ];

      for (let i = 1354; i < 1420; i++) {
        const [leap, err] = JDC.leap(i);
        expect(err).toBeNull();

        const expected = leapYears.includes(i);
        expect(leap).toBe(expected);
      }
    },
    (successful) => {
      successful && passed++;
    }
  );

  test(
    "Performance Metrics",
    () => {
      const jalaaliYears = [];
      const results = [];
      const itemsCount = 500;

      // Creating random Years
      for (let i = 0; i < itemsCount; i++) {
        const year = Math.trunc(Math.random() * 2000);
        jalaaliYears.push(year);
      }

      // Storing the results and the timestamps
      for (let i = 0; i < itemsCount; i++) {
        const st = performance.now();
        const result = JDC.leap(jalaaliYears[i]);
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
      console.log(
        `\t- Avrage compute per item: ${averageComputeDuration} microseconds\n`,
        `\t- Total compute for ${itemsCount} items: ${totalComputeTime.toFixed(
          2
        )}ms`
      );
    },
    (successful) => {
      successful && passed++;
    }
  );

  if (passed !== 3) {
    console.error("  Didn't pass all the tests\n\n");
  } else {
    console.log(`  ✔️ Passed ${passed}/3\n\n`);
  }
};

export default leapTests;
