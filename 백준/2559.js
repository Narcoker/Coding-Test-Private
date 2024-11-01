const fs = require("fs");
const input = fs
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "\\data.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

function solution(N, M, arr) {
  let answer = 0;
  let result = 0;
  let left = 0;
  for (let right = 0; right < arr.length; right++) {
    if (right - left < M) {
      answer += arr[right];
      result += arr[right];
    } else {
      result += arr[right];
      result -= arr[left];
      answer = Math.max(answer, result);
      left += 1;
    }
  }

  console.log(answer);
}

solution(N, M, arr);
