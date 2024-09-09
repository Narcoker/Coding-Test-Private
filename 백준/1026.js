const fs = require("fs");
const input = fs
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "\\data.txt"
  )
  .toString()
  .split("\n");

let N = Number(input[0]);
const arrA = input[1].split(" ").map(Number);
const arrB = input[2].split(" ").map(Number);

let result = 0;
arrA.sort((a, b) => a - b);
arrB.sort((a, b) => b - a);

for (let i = 0; i < N; i++) {
  result += arrA[i] * arrB[i];
}

console.log(result);
