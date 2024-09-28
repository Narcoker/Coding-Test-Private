const path =
  process.platform === "linux" ? "/dev/stdin" : __dirname + "\\data.txt";
const input = require("fs").readFileSync(path).toString().trim().split(/\r?\n/);

let N = Number(input[0]);
const arr = [];
let max = 0;
for (let i = 1; i <= N; i++) {
  let number = Number(input[i]);
  arr.push(number);
  max = Math.max(max, number);
}

function solution(N, arr, max) {
  const dp = new Array(max + 1).fill(0);
  dp[1] = 1;
  dp[2] = 2;
  dp[3] = 3;

  for (let i = 4; i < dp.length; i++) {
    dp[i] = dp[i - 3] + Math.floor(i / 2) + 1;
  }

  for (let i = 0; i < N; i++) {
    console.log(dp[arr[i]]);
  }
}

solution(N, arr, max);
