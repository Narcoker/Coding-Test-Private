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
  let N = Number(input[line++]);
  let prices = input[line++].split(" ").map(Number);
  let answer = 0;
  let max_price = prices.at(-1);
  for (let i = N - 1; i >= 0; i--) {
    if (prices[i] > max_price) {
      max_price = prices[i];
    }
    answer += max_price - prices[i];
  }

  console.log(answer);
}
