const fs = require('fs');
const N = fs.readFileSync('/dev/stdin').toString().trim() * 1;

let num = new Array(10).fill(1n)

for (let i = 2; i <= N; i++) {
    for (let k = 1; k < 10; k++)
        num[k] = num[k] + num[k - 1];
}

console.log((num.reduce((res, v) => res + v) % 10_007n).toString());