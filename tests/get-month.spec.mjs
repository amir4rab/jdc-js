import JDC from "../main.mjs";

// Testing utilities
import { expect, test } from "./test.spec.mjs";

/**
 * Included tests:
 *  - Input Validation
 *  - Algorithm Correctness
 */
const getMonthTests = () => {
  console.log(`Executing "getMonth" tests\n`);
  let passed = 0;

  test(
    "Input validation",
    () => {
      let [_, err] = [0, null];

      //** ------------------------- **//
      //** -- Invalid types       -- **//
      //** ------------------------- **//
      [_, err] = JDC.getMonth("", 0);
      expect(err).toBeError();

      [_, err] = JDC.getMonth(0, "");
      expect(err).toBeError();

      //** ------------------------- **//
      //** -- Out of range Year   -- **//
      //** ------------------------- **//
      [_, err] = JDC.getMonth(4000, 0);
      expect(err).toBeError();

      [_, err] = JDC.getMonth(-100, 0);
      expect(err).toBeError();

      //** ------------------------- **//
      //** -- Out of range Month  -- **//
      //** ------------------------- **//
      [_, err] = JDC.getMonth(1400, -1);
      expect(err).toBeError();

      [_, err] = JDC.getMonth(1400, 12);
      expect(err).toBeError();
    },
    (successful) => {
      successful && passed++;
    }
  );

  test(
    "Month finding correctness",
    () => {
      const leapYears = [
        1354, 1358, 1362, 1366, 1370, 1375, 1379, 1383, 1387, 1391, 1395, 1399,
        1403, 1408, 1412, 1416,
      ];

      // Checking if the month is correctly selected
      for (let i = 1354; i < 1420; i++) {
        const [monthLength, err] = JDC.getMonth(i, 11);
        expect(err).toBeNull();

        if (leapYears.includes(i)) {
          expect(monthLength).toBe(30);
        } else {
          expect(monthLength).toBe(29);
        }
      }
    },
    (successful) => {
      successful && passed++;
    }
  );

  if (passed !== 2) {
    console.error("  Didn't pass all the tests\n\n");
  } else {
    console.log(`  ✔️ Passed ${passed}/2\n\n`);
  }
};

export default getMonthTests;
