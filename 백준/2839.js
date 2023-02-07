const fs = require('fs');
let n = fs.readFileSync("/dev/stdin").toString().trim() * 1;
const arr = new Array(n + 1).fill(-1);
arr[3] = 1;
arr[5] = 1;
for (let i = 6; i < arr.length; i++) {
    if (arr[i - 5] !== -1) {
        arr[i] = arr[i - 5] + 1;
        continue;
    }
    if (arr[i - 3] !== -1) {
        arr[i] = arr[i - 3] + 1;
        continue;
    }
}

console.log(arr[n]);
