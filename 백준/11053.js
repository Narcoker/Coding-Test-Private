const path =
  process.platform === "linux" ? "/dev/stdin" : __dirname + "\\data.txt";
const input = require("fs").readFileSync(path).toString().split("\n");

let [N, arr] = [Number(input[0]), input[1].split(" ").map(Number)];

function solution(N, arr) {
  const dp = new Array(N).fill(1);
  for (let curIndex = 1; curIndex < N; curIndex++) {
    for (let preIndex = 0; preIndex < curIndex; preIndex++) {
      if (arr[preIndex] < arr[curIndex]) {
        dp[curIndex] = Math.max(dp[curIndex], dp[preIndex] + 1);
      }
    }
  }
  return Math.max(...dp);
}

const answer = solution(N, arr);
console.log(answer);

// const fs = require('fs');
// let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
// let n = Number(input.shift());
// input = input[0].split(' ').map(Number);

// let result = new Array(n).fill(1);
// for (let targetIndex = 0; targetIndex < n; targetIndex++) {
//     for (let index = 0; index < targetIndex; index++) {
//         if (input[targetIndex] > input[index]) {
//             result[targetIndex] = Math.max(result[targetIndex], result[index] + 1);
//         }
//     }
// }

// console.log(Math.max(...result));
