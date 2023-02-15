// Ezreal 여눈부터 가네 ㅈㅈ
const fs = require('fs');
const N = fs.readFileSync('/dev/stdin').toString().trim() * 1;

const dp = Array.from(Array(1516), () => Array(3).fill(0));
const mod = 1_000_000_007;
dp[2][0] = 1;
dp[2][2] = 1;

for (let i = 3; i <= N; i++) {
    dp[i][0] = (dp[i - 1][2] + dp[i - 1][1]) % mod;
    dp[i][1] = (dp[i - 1][0] + dp[i - 1][2]) % mod;
    dp[i][2] = (dp[i - 1][1] + dp[i - 1][0]) % mod;
}

console.log(dp[N][0])