const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let n = Number(input.shift());
input = input[0].split(' ').map(Number);

let result = new Array(n).fill(1);
for (let targetIndex = 0; targetIndex < n; targetIndex++) {
    for (let index = 0; index < targetIndex; index++) {
        if (input[targetIndex] > input[index]) {
            result[targetIndex] = Math.max(result[targetIndex], result[index] + 1);
        }
    }
}

console.log(Math.max(...result));