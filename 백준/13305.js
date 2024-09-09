const fs = require("fs");
const input = fs
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "\\data.txt"
  )
  .toString()
  .split("\n");

let N = Number(input[0]);
let distances = input[1].split(" ").map(Number);
let oil_prices = input[2].split(" ").map(Number);
let answer = BigInt(0);

let cur_min_price = Number.MAX_SAFE_INTEGER;

for (let i = 0; i < N; i++) {
  if (cur_min_price >= oil_prices[i]) {
    cur_min_price = oil_prices[i];
  }
  oil_prices[i] = cur_min_price;
}

for (let i = 0; i < N - 1; i++) {
  answer += BigInt(oil_prices[i]) * BigInt(distances[i]);
}

console.log(answer.toString());
