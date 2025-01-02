const path =
  process.platform === "linux" ? "/dev/stdin" : __dirname + "\\data.txt";
const input = require("fs").readFileSync(path).toString().trim().split(/\r?\n/);

let lineIdx = 0;
const [N, M, K] = input[lineIdx++].split(" ").map(Number);
const arr = [];
for (let i = 0; i < N; i++) {
  arr.push(input[lineIdx++].split("").map(Number));
}

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(value) {
    const node = new Node(value);

    if (this.head === null) this.head = node;
    else this.tail.next = node;

    this.tail = node;
    this.length += 1;
  }

  pop() {
    if (this.length === 0) throw new Error("queue is empty");

    const result = this.head.value;
    this.head = this.head.next;
    this.length -= 1;
    return result;
  }
}

function solution(N, M, K, arr) {
  const queue = new Queue();
  const visited = Array.from(new Array(N), () =>
    Array.from(new Array(M), () =>
      Array.from(new Array(2), () => new Array(K + 1).fill(false))
    )
  ); // 행, 열, 낮/밤, 남은 벽뿌

  const [MORNING, NIGHT] = [0, 1];
  queue.push([0, 0, MORNING, K, 1]); // 행, 열, 낮/밤, 남은 벽뿌, 이동 횟수
  visited[0][0][MORNING][K] = true;

  const vectors = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [0, 0],
  ];
  while (queue.length > 0) {
    const [curY, curX, isNight, remain, count] = queue.pop();

    if (curY === N - 1 && curX === M - 1) {
      return count;
    }

    for (let [dy, dx] of vectors) {
      let nextY = curY + dy;
      let nextX = curX + dx;
      let nextIsNight = isNight === NIGHT ? MORNING : NIGHT;

      if (!(0 <= nextY && nextY < N && 0 <= nextX && nextX < M)) continue; // 외부면 패스

      if (
        arr[nextY][nextX] === 0 &&
        !visited[nextY][nextX][nextIsNight][remain]
      ) {
        queue.push([nextY, nextX, nextIsNight, remain, count + 1]);
        visited[nextY][nextX][nextIsNight][remain] = true;
      } else if (
        arr[nextY][nextX] === 1 &&
        !visited[nextY][nextX][nextIsNight][remain] &&
        remain > 0 &&
        isNight === MORNING
      ) {
        queue.push([nextY, nextX, nextIsNight, remain - 1, count + 1]);
        visited[nextY][nextX][nextIsNight][remain - 1] = true;
      } else if (
        curX === nextX &&
        curY === nextY &&
        !visited[nextY][nextX][nextIsNight][remain]
      ) {
        queue.push([nextY, nextX, nextIsNight, remain, count + 1]);
        visited[nextY][nextX][nextIsNight][remain] = true;
      }
    }
  }
  return -1;
}

console.log(solution(N, M, K, arr));
