ST GW1
---

## 1. 
### (a) Find the Last Index of an Element in an Array

```javascript
/**
 * Find last index of element
 *
 * @param {Object[]} x - The array to search.
 * @param {number} y - The value to look for.
 *
 * @returns {number} Last index of y in x; -1 if absent.
 * @throws TypeError if x is not an array or y is not a
 * number.
 */
function findLast(x, y) {
    if (!Array.isArray(x)) {
        throw new TypeError("The first parameter must be an array");
    }
    if (typeof y !== "number") {
        throw new TypeError("The second parameter must be a number");
    }
    for (let i = x.length - 1; i >= 0; i--) { // should consider the case of i = 0
        if (x[i] === y) {
            return i;
        }
    }
    return -1;
}
```

### (b)
test: x = '天大的錯誤', y = '出來吧孩子'
應該不要執行到 for 那邊，就不會碰到 Fault

### \(c)
test: x = [2, 3, 5]; y = 3; Expected = 1
他在碰到 error state 之前就會回傳了，所以不會有問題

### (d)
test: x = [2, 3, 5]; y = 1; Expected = -1
他會把 x[0] = 2 跳過，但確實找不到，不會造成 failure

### (e)
error state = -1, expected = -1
the state will pass through
(1) i=2, x[2] = 5, y=2
(2) i=1, x[1] = 3, y=2
(3) i=0, i>0 == false, return -1, it result in the error state
the expected state should be
(1) i=2, x[2] = 5, y=2
(2) i=1, x[1] = 3, y=2
(3) i=0, x[0] = 2, y=2, return 0

## 2.

### (a)
```javascript
/**
 * Find last index of zero
 *
 * @param {Object[]} x - The array to search.
 *
 * @returns {number} Last index of 0 in x; -1 if absent.
 * @throws TypeError if x is not an array.
 */
function lastZero(x) {
    if (!Array.isArray(x)) {
        throw new TypeError("Not an array");
    }
    for (let i = x.length - 1; i >= 0; i--) {
        // should consider the case of i = 0
        if (x[i] === 0) {
            return i;
        }
    }
    return -1;
}
```

### (b)
test: x = '這是天大的錯誤'
應該不要執行到 for 那邊，就不會碰到 Fault

### \(c)
無法，因為只要執行到 for 迴圈，就會有 error state（開頭 i = 0 先錯，ref: https://e3p.nycu.edu.tw/mod/forum/discuss.php?d=5590)。這樣了話 error state 定義會受到我在 (a) 怎麼改 code 影響。

### (d)
test: x = [0, 1, 1], Expected = 0
他會執行到 for 迴圈那個地方，但是因為他只有一個 0，所以 firstZero 跟 lastZero 一樣意思，不會導致 error state。

### (e)
i = 0, expected = x.length - 1, error state happens, ref to 2. (c)

## 3.

### (a)
```javascript
/**
 * Count positive elements
 *
 * @param {Object[]} x - The array to search.
 *
 * @returns {number} Count of positive elements in x.
 * @throws TypeError if x is not an array.
 */
function countPositive(x) {
    if (!Array.isArray(x)) {
        throw new TypeError("Not an array");
    }
    let count = 0;
    for (let i = 0; i < x.length; i++) {
        if (x[i] > 0) {
            // zero is not positive nor negative
            count++;
        }
    }
    return count;
}
```
### (b)
x = '天大的錯誤'
不要執行到 for 迴圈就不會遇到這個錯誤
### (c)
x = [1, 2, 3, 4]; Expected = 4
不要有 0 就不會造成 error state
### (d)
無法，觸發到 x[i] >= 0 就會讓 count++，導致最後輸出錯誤
### (e)
無法，因為沒有 (d) 錯誤

## 4.

### (a)
```javascript
/**
 * Count odd or postive elements
 *
 * @param {Object[]} x - The array to search.
 *
 * @return {number} Count of odd/positive values in x.
 * @throws TypeError if x is not an array.
 */
function oddOrPos(x) {
    if (!Array.isArray(x)) {
        throw new TypeError("Not an array");
    }
    let count = 0;
    for (let i = 0; i < x.length; i++) {
        if (Math.abs(x[i] % 2) === 1 || x[i] > 0) {
            // should consider js feature of negative remainder
            count++;
        }
    }
    return count;
}
```

### (b)
test: x = '這是天大的錯誤'
應該不要執行到 for 那邊，就不會碰到 fault
### \(c)
test: x = [3, -2, 0, 1, 4]; expected = 3
不要有負的奇數，這樣就算 fault 被執行到，也不會錯誤。除非說 -2 % 2 = -0 不是 0，不然
### (d)
沒辦法，因為只要 error state 出現就不會被算進去。
### (e)
by (d) 這樣我就不能寫這邊了 qq
