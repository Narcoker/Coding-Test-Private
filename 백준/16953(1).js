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
    if (!this.head) {
      this.head = newNode;
    } else {
      this.tail.next = newNode;
    }

    this.tail = newNode;
    this.size++;
  }

  pop() {
    if (this.size === 0) throw new Error('this queue is empty');
    const result = this.head.value;

    this.head = this.head.next;

    this.size--;
    return result;
  }
}

const path =
  process.platform === 'linux' ? '/dev/stdin' : __dirname + '\\data.txt';
const [A, B] = require('fs')
  .readFileSync(path)
  .toString()
  .split(' ')
  .map(Number);

function solution(A, B) {
  const queue = new Queue();
  const visited = new Set();
  queue.push([A, 0]);
  visited.add(A);

  let answer = 10e9;

  while (queue.size > 0) {
    const [cur, count] = queue.pop();

    if (cur === B) {
      answer = Math.min(answer, count);
      break;
    }

    const nextNums = [cur * 2, Number(cur + '1')];
    for (let nextNum of nextNums) {
      if (!visited.has(nextNum) && nextNum <= B) {
        queue.push([nextNum, count + 1]);
        visited.add(nextNum);
      }
    }
  }

  console.log(answer === 10e9 ? -1 : answer + 1);
}

solution(A, B);
