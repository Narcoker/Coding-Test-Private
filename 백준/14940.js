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
    if (this.head === null) throw new Error("this queue is empty");

    const popItem = this.head;
    this.head = this.head.next;
    this.length -= 1;

    return popItem.item; // item 반환
  }
}

function solution(N, M, arr) {
  let [startY, startX] = [-1, -1];

  for (let row = 0; row < N; row++) {
    if (startY !== -1 || startX !== -1) break;
    for (let col = 0; col < M; col++) {
      if (arr[row][col] === 2) {
        [startY, startX] = [row, col];
        break;
      }
    }
  }

  let answer = Array.from(new Array(N), () => new Array(M).fill(0));
  let visited = Array.from(new Array(N), () => new Array(M).fill(false));

  let queue = new Queue();
  queue.push([startY, startX, 0]);
  visited[startY][startX] = true;

  const vectors = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  while (queue.length > 0) {
    let [curY, curX, count] = queue.pop();

    for (let [dy, dx] of vectors) {
      let [nextY, nextX, nextCount] = [curY + dy, curX + dx, count + 1];
      if (!(0 <= nextY && nextY < N && 0 <= nextX && nextX < M)) continue;
      if (arr[nextY][nextX] === 0) continue;
      if (visited[nextY][nextX]) continue;

      answer[nextY][nextX] = nextCount;
      visited[nextY][nextX] = true;
      queue.push([nextY, nextX, nextCount]);
    }
  }

  for (let row = 0; row < N; row++) {
    for (let col = 0; col < M; col++) {
      if (arr[row][col] === 1 && answer[row][col] === 0) {
        answer[row][col] = -1;
      }
    }

    console.log(answer[row].join(" "));
  }
}

const path =
  process.platform === "linux" ? "/dev/stdin" : __dirname + "\\data.txt";
const input = require("fs").readFileSync(path).toString().trim().split(/\r?\n/);

let lineIdx = 0;
const [N, M] = input[lineIdx++].split(" ").map(Number);
const arr = [];
for (let i = 0; i < N; i++) {
  const line = input[lineIdx++].split(" ").map(Number);
  arr.push(line);
}

solution(N, M, arr);
