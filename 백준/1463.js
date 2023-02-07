const fs = require('fs');
const input = Number(fs.readFileSync('/dev/stdin').toString());
const arr = new Array(input + 1).fill(0);
arr[1] = 0;
arr[2] = 1;
arr[3] = 1;
for (let i = 4; i < arr.length; i++) {
    let min = Number.MAX_SAFE_INTEGER;
    if (i % 3 === 0) {
        min = Math.min(arr[i / 3], min);
    }
    if (i % 2 === 0) {
        min = Math.min(arr[i / 2], min);
    }
    min = Math.min(arr[i - 1], min);
    arr[i] = min + 1;
}

console.log(arr[input]);
