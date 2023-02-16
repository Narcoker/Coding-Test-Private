const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let N = input.shift() * 1;
input = [-1001, ...input[0].split(' ').map(Number)];

const dp = [...input];
for (let i = 1; i <= N; i++) {
    dp[i] = Math.max(input[i], dp[i - 1] + input[i]);
}

console.log(Math.max(...dp));
