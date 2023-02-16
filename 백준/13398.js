const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let N = input.shift() * 1;
input = [...input[0].split(' ').map(Number)];
let answer = input[0];
const dp = input.map(() => [0, 0]);
dp[0] = [input[0], input[0]];;

for (let i = 1; i < N; i++) {
    dp[i][0] = Math.max(dp[i - 1][0] + input[i], input[i]); // 제거
    dp[i][1] = Math.max(dp[i - 1][0], dp[i - 1][1] + input[i]);
    answer = Math.max(answer, dp[i][0], dp[i][1]);
}

console.log(answer);
