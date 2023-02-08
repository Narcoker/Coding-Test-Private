const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split("\n");
let N = Number(input.shift());
input = input.map(rgb => rgb.split(' ').map(Number));

for (let i = 1; i < input.length; i++) {
    input[i][0] += Math.min(input[i - 1][1], input[i - 1][2]);
    input[i][1] += Math.min(input[i - 1][0], input[i - 1][2]);
    input[i][2] += Math.min(input[i - 1][0], input[i - 1][1]);
}

console.log(Math.min(...input.at(-1)))


