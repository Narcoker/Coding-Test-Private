const path =
  process.platform === "linux" ? "/dev/stdin" : __dirname + "\\data.txt";
const input = require("fs").readFileSync(path).toString().trim().split(/\r?\n/);

let lineIdx = 0;
const [N, M, B] = input[lineIdx++].split(" ").map(Number);

const arr = [];
for (let i = 0; i < N; i++) {
  arr.push(input[lineIdx++].split(" ").map(Number));
}

function solution(N, M, B, arr) {
  let answerTime = Infinity;
  let answerHeight = Infinity;
  let maxHeight = 0;
  for (let row of arr) {
    maxHeight = Math.max(maxHeight, ...row);
  }

  for (let target = 0; target <= maxHeight; target++) {
    let breakCount = 0;
    let appendCount = 0;
    for (let row = 0; row < N; row++) {
      for (let col = 0; col < M; col++) {
        if (arr[row][col] >= target) {
          breakCount += arr[row][col] - target;
        } else {
          appendCount += target - arr[row][col];
        }
      }
    }

    if (appendCount > breakCount + B) continue;

    let needTime = breakCount * 2 + appendCount;

    if (needTime < answerTime) {
      answerTime = needTime;
      answerHeight = target;
    } else if (needTime === answerTime) {
      answerHeight = Math.max(answerHeight, target);
    }
  }

  console.log(answerTime, answerHeight);
}

solution(N, M, B, arr);
