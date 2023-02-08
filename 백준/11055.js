const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let n = Number(input.shift());
input = input[0].split(' ').map(Number);
let result = [...input];

for (let targetIndex = 1; targetIndex < n; targetIndex++) {
    for (let index = 0; index < targetIndex; index++) {
        if (input[index] < input[targetIndex]) {
            result[targetIndex] = Math.max(result[targetIndex], result[index] + input[targetIndex]);
        }
    }
}

console.log(Math.max(...result));