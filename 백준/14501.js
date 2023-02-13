const fs = require('fs');
let input = fs.readFileSync(__dirname + '/data.txt').toString().trim().split('\n').map((data) => data.split(' ').map(Number));
let N = input[0][0];
let T = new Array(N + 1).fill(0);
let P = new Array(N + 1).fill(0);

for (let i = 1; i <= N; i++) {
    let [tInput, pInput] = input[i];
    T[i] = tInput;
    P[i] = pInput;
}

let dp = [...P];

for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= N; j++) { // dp index
        if (j - i - T[i] >= 0) {
            dp[j] = Math.max(dp[i] + P[j], dp[j])
        }
    }
    if (i + T[i] > N + 1) dp[i] = -1;
}
console.log(Math.max(...dp));