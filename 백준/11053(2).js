const path =
  process.platfrom === "linux" ? "/dev/stdin" : __dirname + "\\data.txt";
const input = require("fs").readFileSync(path).toString().trim().split(/\r?\n/);

let lineIdx = 0;
const N = Number(input[lineIdx++]);
const arr = input[lineIdx++].split(" ").map(Number);

function solution(N, arr) {
  const dp = new Array(N).fill(1);

  for (let curIdx = 1; curIdx < N; curIdx++) {
    for (let preIdx = 0; preIdx < curIdx; preIdx++) {
      if (arr[preIdx] < arr[curIdx]) {
        dp[curIdx] = Math.max(dp[preIdx] + 1, dp[curIdx]);
      }
    }
  }

  console.log(Math.max(...dp));
}

solution(N, arr);
