const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(Number);
let n = input.shift();
input = input.unshift(0);
if (n === 1) return console.log(input[1]);
if (n === 2) return console.log(input[1] + input[2]);

let dp = new Array(n + 1).fill(0);
dp[1] = input[1];
dp[2] = input[1] + input[2];

for (let i = 3; i <= n; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 1] + input[i], dp[i - 3] + input[i - 1] + input[i]);
}

console.log(dp[n]);
