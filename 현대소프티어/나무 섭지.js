class Queue {
  constructor() {
    this.data = {};
    this.front = 0;
    this.rear = 0;
  }

  size() {
    return this.rear - this.front;
  }

  push(value) {
    this.data[this.rear++] = value;
  }

  pop() {
    if (this.size() === 0) {
      throw new Error("queue is empty");
    }

    const result = this.data[this.front];
    delete this.data[this.front++];
    return result;
  }

  state() {
    console.log(this.data);
    console.log(`front: ${this.front}, rear: ${this.rear}`);
  }
}

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];

rl.on("line", (line) => {
  lines.push(line);
}).on("close", () => {
  let [N, M] = lines[0].split(" ").map(Number);
  const maze = [];

  let [namwoo_y, namwoo_x] = [-1, -1];
  const ghosts = [];
  for (let row = 0; row < N; row++) {
    let maze_row = lines[row + 1].split("");

    for (let col = 0; col < M; col++) {
      if (maze_row[col] === "G") {
        ghosts.push([row, col]);
      } else if (maze_row[col] === "N") {
        [namwoo_y, namwoo_x] = [row, col];
      }
    }
    maze.push(maze_row);
  }

  const queue = new Queue();
  const n_visited = Array.from(new Array(N), () => new Array(M).fill(false));
  const g_visited = Array.from(new Array(N), () => new Array(M).fill(false));

  queue.push([namwoo_y, namwoo_x, "N"]);
  n_visited[namwoo_y][namwoo_x] = true;

  for (let [gy, gx] of ghosts) {
    queue.push([gy, gx, "G"]);
    g_visited[gy][gx] = true;
  }

  while (queue.size() > 0) {
    const [cur_y, cur_x, who] = queue.pop();

    const vectors = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];
    for (let [dy, dx] of vectors) {
      const [next_y, next_x, next_count] = [cur_y + dy, cur_x + dx];

      if (who === "N") {
        if (
          0 <= next_y &&
          next_y < N &&
          0 <= next_x &&
          next_x < M &&
          maze[next_y][next_x] !== "#" &&
          !n_visited[next_y][next_x] &&
          !g_visited[next_y][next_x]
        ) {
          queue.push([next_y, next_x, who]);
          n_visited[next_y][next_x] = true;

          if (maze[next_y][next_x] === "D") {
            console.log("Yes");
            return;
          }
        }
      } else if (who === "G") {
        if (
          0 <= next_y &&
          next_y < N &&
          0 <= next_x &&
          next_x < M &&
          !g_visited[next_y][next_x]
        ) {
          queue.push([next_y, next_x, who]);
          g_visited[next_y][next_x] = true;
        }
      }
    }
  }

  console.log("No");
});
