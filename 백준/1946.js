const fs = require("fs");
const input = fs
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "\\data.txt"
  )
  .toString()
  .split("\n");

let line = 0;
const T = Number(input[line++]);

for (let t = 0; t < T; t++) {
  let N = input[line++];
  let answer = 1;
  let tests = [];
  for (let person = 0; person < N; person++) {
    let test = input[line++].split(" ").map(Number);
    tests.push(test);
  }
  tests.sort((a, b) => a[0] - b[0]);

  let max = tests[0][1];
  for (let idx = 1; idx < N; idx++) {
    if (max > tests[idx][1]) {
      answer++;
      max = tests[idx][1];
    }
  }

  console.log(answer);
}
