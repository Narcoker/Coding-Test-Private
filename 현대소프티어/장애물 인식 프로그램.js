const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];

rl.on("line", (line) => {
  lines.push(line);
}).on("close", () => {
  const answer = [];
  const N = Number(lines[0]);
  const maze = [];
  for (let row = 0; row < N; row++) {
    maze.push(lines[row + 1].split("").map(Number));
  }

  const visited = Array.from(new Array(N), () => new Array(N).fill(false));

  for (let row = 0; row < N; row++) {
    for (let col = 0; col < N; col++) {
      if (maze[row][col] === 1 && !visited[row][col]) {
        let count = dfs(row, col, maze, visited);
        answer.push(count);
      }
    }
  }

  answer.sort((a, b) => a - b);

  console.log(answer.length);
  for (let i = 0; i < answer.length; i++) {
    console.log(answer[i]);
  }
});

function dfs(row, col, maze, visited) {
  const stack = [[row, col]];
  visited[row][col] = true;
  const vectors = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const N = maze.length;
  let count = 1;

  while (stack.length > 0) {
    let [cur_y, cur_x] = stack.pop();

    for (let [dy, dx] of vectors) {
      let [next_y, next_x] = [cur_y + dy, cur_x + dx];

      if (
        0 <= next_y &&
        next_y < N &&
        0 <= next_x &&
        next_x < N &&
        !visited[next_y][next_x] &&
        maze[next_y][next_x] === 1
      ) {
        stack.push([next_y, next_x]);
        visited[next_y][next_x] = true;
        count++;
      }
    }
  }
  return count;
}
