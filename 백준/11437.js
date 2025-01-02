const path =
  process.platform === "linux" ? "/dev/stdin" : __dirname + "\\data.txt";
const input = require("fs").readFileSync(path).toString().trim().split(/\r?\n/);

let lineIdx = 0;
const N = Number(input[lineIdx++]);
const board = Array.from(new Array(N + 1), () => []);

for (let i = 0; i < N - 1; i++) {
  const [p1, p2] = input[lineIdx++].split(" ").map(Number);
  board[p1].push(p2);
  board[p2].push(p1);
}

const M = Number(input[lineIdx++]);
const testCases = [];

for (let i = 0; i < M; i++) {
  const arr = input[lineIdx++].split(" ").map(Number);
  testCases.push(arr);
}

function solution(N, board, M, testCases) {}

console.log(solution(N, board, M, testCases));
