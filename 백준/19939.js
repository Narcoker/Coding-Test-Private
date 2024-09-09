const fs = require("fs");
const input = fs
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "\\data.txt"
  )
  .toString();

const [N, K] = input.split(" ").map(Number);

let sum = (K * (K + 1)) / 2;
if (N - sum < 0) {
  console.log(-1);
} else {
  if ((N - sum) % K === 0) console.log(K - 1);
  else console.log(K);
}
