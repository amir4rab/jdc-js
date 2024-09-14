/**
 * Wraps a value and provides simple assertion tests
 * @template T
 * @param {T} value
 * @returns {{ toBe: (value: T) => void, toBeError: () => void, toBeNull: () => void }}
 */
export const expect = (value) => ({
  toBe: (expectedValue) => {
    if (value !== expectedValue) {
      throw new Error(
        `Expected the value to be "${expectedValue}", but received "${value}"`
      );
    }
  },
  toBeError: () => {
    if (value instanceof TypeError) {
      throw new Error(`Expected the value to be an instance of error type`);
    }
  },
  toBeNull: () => {
    if (value !== null) {
      throw new Error(`Expected the value to be null but received ${value}`);
    }
  },
});

/**
 * Wraps a group of tests in a try-catch block and logs the total compute time
 * @param {string} name
 * @param {() => void} tests
 * @param {(result: boolean) => void} [result]
 * @returns {void}
 */
export const test = (name, tests, result) => {
  const st = performance.now();
  try {
    tests();
  } catch (err) {
    console.error(`[${name}]:`, err);
    result && result(false);
    return;
  }

  const cd = Math.trunc(performance.now() - st);
  console.log(`✔️ ${name} (${cd}ms)`);
  result && result(true);
};
