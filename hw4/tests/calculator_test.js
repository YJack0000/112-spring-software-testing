const assert = require('assert');
const { test } = require('node:test');
const Calculator = require('../src/calculator');

test('Calculator: invalid month1 should throw an error', async () => {
  await assert.rejects(
    async () => { // Make sure to wrap the call in an async function
      return Calculator.main(0, 10, 5, 15, 2022);
    },
    {
      name: 'Error',
      message: /invalid month1/
    },
    'Expected to throw an error for invalid month1 but did not'
  );
});

test('Calculator: invalid month2 should throw an error', async () => {
  await assert.rejects(
    async () => { // Use async function to ensure a Promise is returned
      return Calculator.main(5, 10, 13, 15, 2022);
    },
    {
      name: 'Error',
      message: /invalid month2/
    },
    'Expected to throw an error for invalid month2 but did not'
  );
});

test('Calculator: calculate days correctly within the same month', () => {
  assert.strictEqual(Calculator.main(1, 1, 1, 31, 2022), 30);
});

test('Calculator: handle leap years correctly', () => {
  assert.strictEqual(Calculator.main(2, 1, 3, 1, 2020), 29);  // Leap year
  assert.strictEqual(Calculator.main(2, 1, 3, 1, 2021), 28);  // Non-leap year
});

// 檢測 month1 的邊界值
test('Calculator: month1 boundary values', async () => {
  await assert.rejects(
    async () => Calculator.main(0, 1, 2, 1, 2022),
    {
      name: 'Error',
      message: /invalid month1/
    },
    'Expected an error with invalid month1'
  );
  await assert.rejects(
    async () => Calculator.main(13, 1, 2, 1, 2022),
    {
      name: 'Error',
      message: /invalid month1/
    },
    'Expected an error with invalid month1'
  );
});

// 檢測 month2 的邊界值
test('Calculator: month2 boundary values', async () => {
  await assert.rejects(
    async () => Calculator.main(1, 1, 0, 1, 2022),
    {
      name: 'Error',
      message: /invalid month2/
    },
    'Expected an error with invalid month2'
  );
  await assert.rejects(
    async () => Calculator.main(1, 1, 13, 1, 2022),
    {
      name: 'Error',
      message: /invalid month2/
    },
    'Expected an error with invalid month2'
  );
});

// 檢測 day1 的邊界值
test('Calculator: day1 boundary values', async () => {
  await assert.rejects(
    async () => Calculator.main(1, 0, 1, 2, 2022),
    {
      name: 'Error',
      message: /invalid day1/
    },
    'Expected an error with invalid day1'
  );
  await assert.rejects(
    async () => Calculator.main(1, 32, 1, 2, 2022),
    {
      name: 'Error',
      message: /invalid day1/
    },
    'Expected an error with invalid day1'
  );
});

// 檢測 day2 的邊界值
test('Calculator: day2 boundary values', async () => {
  await assert.rejects(
    async () => Calculator.main(1, 1, 1, 0, 2022),
    {
      name: 'Error',
      message: /invalid day2/
    },
    'Expected an error with invalid day2'
  );
  await assert.rejects(
    async () => Calculator.main(1, 1, 1, 32, 2022),
    {
      name: 'Error',
      message: /invalid day2/
    },
    'Expected an error with invalid day2'
  );
});

test('Calculator: calculate days across multiple months', () => {
  assert.strictEqual(Calculator.main(1, 30, 3, 1, 2021), 30);  // 1 day in Jan + 28 in Feb
});

// 測試閏年日期計算
test('Calculator: handle leap years correctly', async () => {
  assert.strictEqual(Calculator.main(2, 28, 3, 1, 2020), 2, "Should handle leap years correctly for Feb 28 to Mar 1, 2020");
  assert.strictEqual(Calculator.main(2, 29, 3, 1, 2020), 1, "Should handle leap years correctly for Feb 29 to Mar 1, 2020");
});

// 測試月份剛好在邊界上的值
test('Calculator: month boundary edge cases', async () => {
  await assert.rejects(
    async () => Calculator.main(0, 1, 1, 1, 2022),
    /invalid month1/,
    'Should throw an error for month1 being zero'
  );
  await assert.rejects(
    async () => Calculator.main(13, 1, 1, 1, 2022),
    /invalid month1/,
    'Should throw an error for month1 being 13'
  );

  await assert.rejects(
    async () => Calculator.main(1, 1, 0, 1, 2022),
    /invalid month2/,
    'Should throw an error for month2 being zero'
  );
  await assert.rejects(
    async () => Calculator.main(1, 1, 13, 1, 2022),
    /invalid month2/,
    'Should throw an error for month2 being 13'
  );
});

// 測試日期剛好在邊界上的值
test('Calculator: day boundary edge cases', async () => {
  await assert.rejects(
    async () => Calculator.main(1, 0, 1, 1, 2022),
    /invalid day1/,
    'Should throw an error for day1 being zero'
  );
  await assert.rejects(
    async () => Calculator.main(1, 32, 1, 1, 2022),
    /invalid day1/,
    'Should throw an error for day1 being 32'
  );

  await assert.rejects(
    async () => Calculator.main(1, 1, 1, 0, 2022),
    /invalid day2/,
    'Should throw an error for day2 being zero'
  );
  await assert.rejects(
    async () => Calculator.main(1, 1, 1, 32, 2022),
    /invalid day2/,
    'Should throw an error for day2 being 32'
  );
});

// 測試年份的邊界值和條件變更
test('Calculator: year boundary and conditional changes', async () => {
  await assert.rejects(
    async () => Calculator.main(1, 1, 1, 1, 0),
    /invalid year/,
    'Should throw an error for year being zero'
  );
  await assert.rejects(
    async () => Calculator.main(1, 1, 1, 1, 10001),
    /invalid year/,
    'Should throw an error for year being 10001'
  );
});

// 測試閏年計算的特殊情況
test('Calculator: special leap year calculations', () => {
  assert.strictEqual(Calculator.main(2, 1, 3, 1, 2020), 29, 'Should calculate correctly for a leap year');
  assert.strictEqual(Calculator.main(2, 1, 3, 1, 1900), 28, 'Should calculate correctly for a non-leap year which is divisible by 100 but not 400');
});

test('Calculator: test month, day, and year boundaries', async () => {
  await assert.rejects(
    async () => Calculator.main(0, 10, 5, 15, 2022),  // 月份下界
    /invalid month1/,
    "Should catch invalid month1"
  );
  await assert.rejects(
    async () => Calculator.main(13, 10, 5, 15, 2022),  // 月份上界
    /invalid month1/,
    "Should catch invalid month2"
  );
  await assert.rejects(
    async () => Calculator.main(1, 0, 5, 15, 2022),  // 日下界
    /invalid day1/,
    "Should catch invalid day1"
  );
  await assert.rejects(
    async () => Calculator.main(1, 32, 5, 15, 2022),  // 日上界
    /invalid day1/,
    "Should catch invalid day1"
  );
  await assert.rejects(
    async () => Calculator.main(1, 10, 5, 15, 0),  // 年下界
    /invalid year/,
    "Should catch invalid year"
  );
  await assert.rejects(
    async () => Calculator.main(1, 10, 5, 15, 10001),  // 年上界
    /invalid year/,
    "Should catch invalid year"
  );
});

// 測試第二個日期小於第一個日期的情況
test('Calculator: second date is earlier than the first date', async () => {
  await assert.rejects(
    async () => Calculator.main(5, 15, 5, 10, 2022),  // 相同月份，但結束日小於開始日
    /day1 must be less than day2 if month1 is equal to month2/,
    "Should throw an error when the second date (day) is earlier within the same month"
  );

  await assert.rejects(
    async () => Calculator.main(6, 1, 5, 31, 2022),  // 結束月份小於開始月份
    /month1 must be less than month2/,
    "Should throw an error when the second date (month) is earlier"
  );

  await assert.rejects(
    async () => Calculator.main(5, 10, 5, 5, 2022),  // 相同月份和年份，但結束日小於開始日
    /day1 must be less than day2 if month1 is equal to month2/,
    "Should throw an error when the second date (day) is earlier within the same month"
  );
});

test('Calculator: calculate days from end of one month to start of the next', () => {
  // 1月31日到2月1日，非閏年
  assert.strictEqual(Calculator.main(1, 31, 12, 30, 2021), 333, "Should calculate 1 day from January 31 to February 1, 2021");

  // 2月28日到3月1日，非閏年
  assert.strictEqual(Calculator.main(12, 31, 12, 31, 2021), 0, "Should calculate 1 day from February 28 to March 1, 2021");

  // 2月29日到3月1日，閏年
  assert.strictEqual(Calculator.main(2, 29, 3, 1, 2020), 1, "Should calculate 1 day from February 29 to March 1, 2020");
});

test('Calculator: calculate days at year boundaries', () => {
  // 12月31日 1 年 到 1月1日 2 年
  assert.strictEqual(Calculator.main(1, 1, 1, 2, 1), 1, "Should calculate 1 day from December 31, Year 1 to January 1, Year 2");

  // 12月31日 9999 年 到 1月1日 10000 年
  assert.strictEqual(Calculator.main(1, 1, 1, 2, 10000), 1, "Should calculate 1 day from December 31, Year 9999 to January 1, Year 10000");
});

test('Calculator: validate leap year calculations', () => {
  // 非閏年但年份是100的倍數
  assert.strictEqual(Calculator.main(2, 28, 3, 1, 1900), 1, "Should calculate correctly for non-leap year that is a multiple of 100 but not 400");

  // 閏年且年份是400的倍數
  assert.strictEqual(Calculator.main(2, 29, 3, 1, 2000), 1, "Should handle leap years correctly for year multiple of 400");

  // 確保閏年條件修改後不影響計算結果
  assert.strictEqual(Calculator.main(2, 29, 3, 1, 2004), 1, "Should handle typical leap year correctly");

  // 確保閏年條件修改後不影響非閏年的計算
  assert.strictEqual(Calculator.main(2, 28, 3, 1, 2001), 1, "Should handle typical non-leap year correctly");
});