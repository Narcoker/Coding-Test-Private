const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let N = input.shift() * 1;
input = input.map(data => data.split(' ').map(Number));

for (let i = 1; i < input.length; i++) {
    for (let k = 0; k < input[i].length; k++) {
        if (k === 0) {
            input[i][k] += input[i - 1][k];
        }
        else if (k === input[i].length - 1) {
            input[i][k] += input[i - 1][k - 1];
        }
        else
            input[i][k] = Math.max(input[i][k] + input[i - 1][k - 1], input[i][k] + input[i - 1][k])
    }
}

console.log(Math.max(...input[N - 1]));