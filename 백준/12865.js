const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map((data) => data.split(' ').map(Number));
let [N, K] = input[0];
let w = new Array(N + 1).fill(0);
let v = new Array(N + 1).fill(0);
let dp = new Array(K + 1).fill(0);

for (let i = 1; i <= N; i++) {
    let [wInput, vInput] = input[i];
    w[i] = wInput;
    v[i] = vInput;
}

for (let i = 1; i <= N; i++) { // 물품 index
    for (let j = K; j >= 1; j--) { // dp index
        if (w[i] <= j)
            dp[j] = Math.max(dp[j], dp[j - w[i]] + v[i]);
    }
}

console.log(dp[K]);