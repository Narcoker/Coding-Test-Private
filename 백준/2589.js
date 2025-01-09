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
    this.size = 0;
  }

  push(value) {
    const newNode = new Node(value);

    if (this.head === null) this.head = newNode;
    else this.tail.next = newNode;

    this.tail = newNode;
    this.size++;
  }

  pop() {
    if (this.size === 0) throw new Error("this queue is empty");

    const result = this.head.value;
    this.head = this.head.next;
    this.size--;
    return result;
  }
}

const path =
  process.platform === "linux" ? "/dev/stdin" : __dirname + "\\data.txt";
const input = require("fs").readFileSync(path).toString().split(/\r?\n/);

const [r, c] = input[0].split(" ").map(Number);
const arr = [];
for (let i = 1; i < input.length; i++) {
  arr.push(input[i].split(""));
}

function solution(r, c, arr) {
  let answer = 0;

  for (let startY = 0; startY < r; startY++) {
    for (let startX = 0; startX < c; startX++) {
      if (arr[startY][startX] === "L")
        answer = Math.max(bfs(startY, startX, arr), answer);
    }
  }
  console.log(answer);
}

function bfs(startY, startX, arr) {
  let result = 0;
  const visited = Array.from(new Array(r), () => new Array(c).fill(false));
  const vectors = [
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, 0],
  ];
  const queue = new Queue();
  queue.push([startY, startX, 0]);
  visited[startY][startX] = true;

  while (queue.size > 0) {
    const [curY, curX, count] = queue.pop();
    result = Math.max(result, count);

    for (let [dy, dx] of vectors) {
      const nextY = curY + dy;
      const nextX = curX + dx;

      // 경계 조건 확인
      if (nextY < 0 || nextY >= r || nextX < 0 || nextX >= c) continue;
      if (arr[nextY][nextX] === "W") continue; // 바다(W)인 경우
      if (visited[nextY][nextX]) continue; // 이미 방문한 경우

      visited[nextY][nextX] = true;
      queue.push([nextY, nextX, count + 1]); // 거리 +1
    }
  }

  return result;
}

solution(r, c, arr);
