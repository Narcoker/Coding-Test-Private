const path =
  process.platform === "linux" ? "/dev/stdin" : __dirname + "\\data.txt";
const input = require("fs").readFileSync(path).toString().trim().split(/\r?\n/);

let T = Number(input[0]);
let cases = [];
for (let i = 1; i <= T; i++) {
  cases.push(input[i].split(" ").map(Number));
}

function solution(cases) {
  let result = 0;
  let isLined = new Array(21).fill(false);
  for (let person = 1; person < cases.length; person++) {
    for (let i = 1; i < isLined.length; i++) {
      if (isLined[i] && cases[person] < cases[i]) {
        result++;
      }
    }
    isLined[person] = true;
  }
  return result;
}

for (let t = 0; t < T; t++) {
  console.log(`${t + 1} ${solution(cases[t])}`);
}
