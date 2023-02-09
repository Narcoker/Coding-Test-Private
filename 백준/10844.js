const fs = require('fs');
const N = fs.readFileSync('/dev/stdin').toString().trim() * 1;
let numCount = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1];
let nextCount = new Array(10).fill(0);
for (let i = 2; i <= N; i++) {
    for (let k = 0; k < numCount.length; k++) {
        if (k === 0) nextCount[k] = numCount[1];
        else if (k === 9) nextCount[k] = numCount[8];
        else {
            nextCount[k] = (numCount[k - 1] + numCount[k + 1]) % 1_000_000_000;
        }
    }
    numCount = [...nextCount];
}

console.log(numCount.reduce((acc, value) => acc + value) % 1_000_000_000);