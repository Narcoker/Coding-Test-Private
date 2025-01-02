const path =
  process.platform === "linux" ? "/dev/stdin" : __dirname + "\\data.txt";
const input = require("fs").readFileSync(path).toString().split(/\r?\n/);

const N = Number(input[0]);

function solution(N) {
  for (let i = 1; i < 1_000_000; i++) {
    let nextNumber =
      i +
      i
        .toString()
        .split("")
        .map(Number)
        .reduce((acc, value) => acc + value);
    if (nextNumber === N) {
      console.log(i);
      return;
    }
  }

  console.log(0);
}

solution(256);
