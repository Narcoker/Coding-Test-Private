const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(Number);
let T = input.shift();
let dp = new Array(1_000_001).fill(0);
let answer = "";

dp[1] = 1;
dp[2] = 2;
dp[3] = 4;

for (let i = 4; i <= 1_000_001; i++) {
    dp[i] = (dp[i - 1] + dp[i - 2] + dp[i - 3]) % 1_000_000_009;
}

for (let target of input) {
    answer += dp[target] + "\n";
}

console.log(answer);