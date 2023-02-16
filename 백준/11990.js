const fs = require('fs');
// let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(Number);
let input = fs.readFileSync(__dirname + '/data.txt').toString().trim().split('\n').map(Number);
let N = input.shift();
let answer = "";

let dp = Array.from(new Array(100001), () => new Array(3).fill(0));
dp[1] = [1, 0, 0];
dp[2] = [0, 1, 0];
dp[3] = [1, 1, 1];

for (let i = 4; i <= 100000; i++) {
    dp[i][0] = (dp[i - 1][1] + dp[i - 1][2]) % 1000000009;
    dp[i][1] = (dp[i - 2][0] + dp[i - 2][2]) % 1000000009;
    dp[i][2] = (dp[i - 3][0] + dp[i - 3][1]) % 1000000009;
}

for (let target of input)
    answer += (dp[target].reduce((res, v) => res + v) % 1000000009) + '\n';

console.log(answer);
