const path =
  process.platform === "linux" ? "/dev/stdin" : __dirname + "\\data.txt";
const [N, r, c] = require("fs")
  .readFileSync(path)
  .toString()
  .split(" ")
  .map(Number);

function solution(N, r, c) {
  if (N === 0) return 0;
  else
    return (
      2 * (r % 2) +
      (c % 2) +
      4 * solution(N - 1, Math.floor(r / 2), Math.floor(c / 2))
    );
}

console.log(solution(N, r, c));
