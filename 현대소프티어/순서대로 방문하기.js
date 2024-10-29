const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];
let answer = 0;

rl.on("line", (line) => {
  lines.push(line);
}).on("close", () => {
  let lineIndex = 0;
  const [n, m] = lines[lineIndex++].split(" ").map(Number);
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(lines[lineIndex++].split(" ").map(Number));
  }

  const points = [];

  for (let i = 0; i < m; i++) {
    let [y, x] = lines[lineIndex++].split(" ").map(Number);
    points.push([y - 1, x - 1]);
  }

  const visited = Array.from(new Array(n), () => new Array(n).fill(false));
  visited[points[0][0]][points[0][1]] = true;
  dfs(0, 1, points, arr, visited, points[0]);

  console.log(answer);
});

function dfs(start, end, points, arr, visited, cur) {
  if (end === points.length) {
    answer++;
    return;
  }

  let [cur_y, cur_x] = cur;
  let [start_y, start_x] = points[start];
  let [end_y, end_x] = points[end];

  if (cur_y === end_y && cur_x === end_x) {
    dfs(end, end + 1, points, arr, visited, [cur_y, cur_x]);
    return;
  }

  const vectors = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  let n = arr.length;
  for (let [dy, dx] of vectors) {
    let [next_y, next_x] = [cur_y + dy, cur_x + dx];

    if (!(0 <= next_y && next_y < n && 0 <= next_x && next_x < n)) continue;
    if (arr[next_y][next_x] === 1) continue;
    if (visited[next_y][next_x]) continue;

    visited[next_y][next_x] = true;
    dfs(start, end, points, arr, visited, [next_y, next_x]);
    visited[next_y][next_x] = false;
  }
}
