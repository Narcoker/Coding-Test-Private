const fs = require('fs');
let N = fs.readFileSync('/dev/stdin').toString().trim() * 1;
let dp = new Array(N + 1).fill(0);
for (let i = 1; i <= N; i++) {
    dp[i] = i;
    for (let j = 1; j * j <= i; j++) {
        dp[i] = Math.min(dp[i], 1 + dp[i - j * j]);
    }
}

console.log(dp[N]);