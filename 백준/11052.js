const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map((data) => data.split(' ').map(Number));
let N = input[0][0];
input = [0, ...input[1]]
let dp = [...input]

for (let total = 1; total <= N; total++) {
    for (let target = 1; target <= total; target++) {
        dp[total] = Math.max(dp[total], dp[total - target] + input[target]);
    }
}

console.log(dp[N])