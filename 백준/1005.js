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
    this.length++;
  }

  pop() {
    if (this.head === null) throw new Error("this queue is empty");
    const result = this.head.value;
    this.head = this.head.next;
    this.length--;
    return result;
  }
}

const path =
  process.platform === "linux" ? "/dev/stdin" : __dirname + "\\data.txt";
const input = require("fs").readFileSync(path).toString().split(/\r?\n/);

let lineIdx = 0;
const T = Number(input[lineIdx++]);

for (let t = 0; t < T; t++) {
  const [N, K] = input[lineIdx++].split(" ").map(Number);
  const dTime = input[lineIdx++].split(" ").map(Number);
  const board = 
}
