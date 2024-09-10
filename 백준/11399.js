const fs = require("fs");
const input = fs
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "\\data.txt"
  )
  .toString()
  .split("\n");

let N = Number(input[0]);
const arr = input[1].split(" ").map(Number);
arr.sort((a, b) => a - b);

for (let i = 1; i < arr.length; i++) {
  arr[i] += arr[i - 1];
}

let answer = arr.reduce((acc, value) => acc + value, 0);
console.log(answer.toString());
