const path =
  process.platform === "linux" ? "/dev/stdin" : __dirname + "\\data.txt";
const input = require("fs").readFileSync(path).toString().split("\n");

let [N, arr] = [Number(input[0]), input[1].split(" ").map(Number)];

function sum(cur, arr, visited, numbers, startIndex) {
  for (let i = startIndex; i < arr.length; i++) {
    if (!visited[i] && !numbers.has(cur + arr[i])) {
      visited[i] = true;
      numbers.add(cur + arr[i]);
      sum(cur + arr[i], arr, visited, numbers, i + 1);
      visited[i] = false;
    }
  }
}

function solution(N, arr) {
  const numbers = new Set();
  const visited = new Array(N).fill(false);
  sum(0, arr, visited, numbers, 0);

  for (let i = 1; i <= N * 100000 + 1; i++) {
    if (!numbers.has(i)) {
      console.log(i);
      return;
    }
  }
}

let answer = 0;
solution(N, arr);
