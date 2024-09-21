class Queue {
  constructor() {
    this.front = 0;
    this.rear = 0;
    this.data = {};
  }

  size() {
    if (this.rear < this.front) {
      throw new Error("front is bigger than rear");
    }
    return this.rear - this.front;
  }

  isEmpty() {
    return this.size() === 0;
  }

  enqueue(value) {
    this.data[this.rear++] = value;
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error("Queue is empty");
    }

    const result = this.data[this.front];
    delete this.data[this.front++];
    return result;
  }

  getData() {
    console.log(this.data);
  }
}

const path =
  process.platform === "linux" ? "/dev/stdin" : __dirname + "\\data.txt";
const input = require("fs").readFileSync(path).toString();
let [A, B] = input.split(" ").map(Number);

function solution(A, B) {
  const visited = new Set();
  const queue = new Queue();

  queue.enqueue([A, 1]);
  visited.add(A);

  while (!queue.isEmpty()) {
    let [cur, count] = queue.dequeue();

    if (cur === B) {
      return count;
    }

    // 2를 곱한다.
    let resultMul = cur * 2;
    if (resultMul <= B && !visited.has(resultMul)) {
      queue.enqueue([resultMul, count + 1]);
      visited.add(resultMul);
    }

    // 1을 수의 가장 오른쪽에 추가한다.
    let resultAppendOne = Number(cur.toString() + "1");
    if (resultAppendOne <= B && !visited.has(resultAppendOne)) {
      queue.enqueue([resultAppendOne, count + 1]);
      visited.add(resultAppendOne);
    }
  }

  return -1;
}

const answer = solution(A, B);
console.log(answer);
