const fs = require("fs");
const input = fs
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "\\data.txt"
  )
  .toString()
  .split("\n");

let N = Number(input[0]);
let arr = [];
for (let i = 0; i < N; i++) {
  let data = input[i + 1].split(" ").map(Number);
  arr.push(data);
}

arr.sort((a, b) => {
  if (a[1] > b[1]) return 1;
  if (a[1] < b[1]) return -1;
  if (a[1] === b[1]) return a[0] - b[0];
});
answer = 0;
nextStart = 0;

for (let i = 0; i < N; i++) {
  if (arr[i][0] >= nextStart) {
    answer++;
    nextStart = arr[i][1];
  }
}

console.log(answer);
