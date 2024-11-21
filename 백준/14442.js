class Node {
  constructor(item) {
    this.item = item;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(item) {
    const node = new Node(item);
    if (this.head == null) {
      this.head = node;
    } else {
      this.tail.next = node;
    }

    this.tail = node;
    this.length += 1;
  }

  pop() {
    const popItem = this.head;
    this.head = this.head.next;
    this.length -= 1;
    return popItem.item;
  }
}

const path =
  process.platform === "linux" ? "/dev/stdin" : __dirname + "\\data.txt";
const input = require("fs").readFileSync(path).toString().trim().split(/\r?\n/);

let lineIdx = 0;
const [N, M, K] = input[lineIdx++].split(" ").map(Number);
const arr = [];
for (let i = 0; i < N; i++) {
  arr.push(input[lineIdx++].split("").map(Number));
}

function solution(N, M, K, arr) {
  const queue = new Queue();
  const visited = Array.from(new Array(N), () =>
    Array.from(new Array(M), () => new Array(K + 1).fill(false))
  );
  const vectors = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  queue.push([0, 0, 1, K]); // y,x,이동 횟수, 남은 벽뿌
  visited[0][0][K] = true;

  while (queue.size() > 0) {
    const [curY, curX, moveCount, remain] = queue.pop();

    if (curY === N - 1 && curX === M - 1) return moveCount;

    for (let [dy, dx] of vectors) {
      const [nextY, nextX] = [curY + dy, curX + dx];

      if (!(0 <= nextY && nextY < N && 0 <= nextX && nextX < M))
        // 영역 밖이면
        continue;

      if (arr[nextY][nextX] === 0 && !visited[nextY][nextX][remain]) {
        visited[nextY][nextX][remain] = true;
        queue.push([nextY, nextX, moveCount + 1, remain]);
      } else if (
        arr[nextY][nextX] === 1 &&
        remain > 0 &&
        !visited[nextY][nextX][remain]
      ) {
        visited[nextY][nextX][remain] = true;
        queue.push([nextY, nextX, moveCount + 1, remain - 1]);
      }
    }
  }

  return -1;
}

console.log(solution(N, M, K, arr));
