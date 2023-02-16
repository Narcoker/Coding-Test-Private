const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let N = input[0] * 1;
input = [0, ...input[1].split(' ').map(Number)];
let dp = [...input];

for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= i; j++) {
        dp[i] = Math.min(dp[i], dp[i - j] + input[j]);
    }
}

console.log(dp[N]);