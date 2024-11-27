const path =
  process.platform === "linux" ? "/dev/stdin" : __dirname + "\\data.txt";
const input = require("fs").readFileSync(path).toString().trim().split(/\r?\n/);

let lineIdx = 0;
const N = Number(input[lineIdx++]);
const stairs = [];
for (let i = 0; i < N; i++) {
  stairs.push(Number(input[lineIdx++]));
}

function solution(N, stairs) {
  stairs = [0, 0, 0, ...stairs];
  const dp = new Array(N + 3).fill(0);

  for (let i = 3; i < N + 3; i++) {
    dp[i] = Math.max(
      dp[i - 2] + stairs[i],
      dp[i - 3] + stairs[i - 1] + stairs[i]
    );
  }
  console.log(dp[dp.length - 1]);
}

solution(N, stairs);
