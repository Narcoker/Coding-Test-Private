const fs = require('fs');
const N = fs.readFileSync("/dev/stdin").toString().trim() * 1;

const dp = new Array(N + 1).fill(0n);
dp[1] = 1n;
dp[2] = 2n;
for (let i = 3; i <= N; i++) {
    dp[i] = (dp[i - 2] + dp[i - 1]) % 15746n;
}

console.log((dp[N] % 15746n).toString());