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
}

const path =
  process.platform === "linux" ? "/dev/stdin" : __dirname + "\\data.txt";
const input = require("fs").readFileSync(path).toString().trim().split(/\r?\n/);

let lineIdx = 0;
const [N, M] = input[lineIdx++].split(" ").map(Number);

const arr = [];
for (let i = 0; i < N; i++) {
  arr.push(input[lineIdx++].split("").map(Number));
}

function solution(N, M, arr) {
  const visited = Array.from(new Array(N), () =>
    Array.from(new Array(M), () => new Array(2).fill(false))
  );
  const queue = new Queue();
  queue.push([0, 0, 1, 1]); // y, x, 이동 횟수, 벽뿌 남은 횟수;
  visited[0][0][1] = true;

  const vectors = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  while (queue.size() > 0) {
    const [cur_y, cur_x, count, breaking] = queue.pop();

    if (cur_y === N - 1 && cur_x === M - 1) {
      return count;
    }

    for (let [dy, dx] of vectors) {
      const [next_y, next_x] = [cur_y + dy, cur_x + dx];

      if (!(0 <= next_y && next_y < N && 0 <= next_x && next_x < M)) {
        continue;
      }

      if (arr[next_y][next_x] === 0 && !visited[next_y][next_x][breaking]) {
        queue.push([next_y, next_x, count + 1, breaking]);
        visited[next_y][next_x][breaking] = true;
      } else if (
        arr[next_y][next_x] === 1 &&
        breaking > 0 &&
        !visited[next_y][next_x][breaking - 1]
      ) {
        queue.push([next_y, next_x, count + 1, breaking - 1]);
        visited[next_y][next_x][breaking - 1] = true;
      }
    }
  }

  return -1;
}

console.log(solution(N, M, arr));
