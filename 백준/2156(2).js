const path =
  process.platform === "linux" ? "/dev/stdin" : __dirname + "\\data.txt";
const input = require("fs").readFileSync(path).toString().trim().split(/\r?\n/);

let lineIdx = 0;
const N = Number(input[lineIdx++]);
const arr = [];
for (let i = 0; i < N; i++) {
  arr.push(Number(input[lineIdx++]));
}

function solution(N, arr) {
  const dp = new Array(N + 3).fill(0); // 이번에 안먹음, 1번 연속, 2번 연속
  arr = [0, 0, 0, ...arr];
  for (let i = 3; i < N + 3; i++) {
    dp[i] = Math.max(
      dp[i - 1],
      dp[i - 2] + arr[i],
      dp[i - 3] + arr[i - 1] + arr[i]
    );
  }
  console.log(dp[dp.length - 1]);
}

solution(N, arr);
