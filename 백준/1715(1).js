class Heap {
  constructor() {
    this.data = [null];
  }

  size() {
    return this.data.length - 1;
  }

  swap(a, b) {
    [this.data[a], this.data[b]] = [this.data[b], this.data[a]];
  }

  push(value) {
    this.data.push(value);

    let curIdx = this.size();
    let parIdx = Math.floor(curIdx / 2);

    while (curIdx > 1) {
      if (this.data[curIdx] < this.data[parIdx]) {
        this.swap(curIdx, parIdx);
        curIdx = parIdx;
        parIdx = Math.floor(curIdx / 2);
      } else {
        break;
      }
    }

    // this.toString();
  }

  pop() {
    const result = this.data[1];

    if (this.size() === 1) {
      this.data = [null];
    } else {
      this.data[1] = this.data.pop();

      let curIdx = 1;
      let left = curIdx * 2;
      let right = curIdx * 2 + 1;

      while (left <= this.size()) {
        let smallIdx = left;

        if (right <= this.size() && this.data[smallIdx] > this.data[right]) {
          smallIdx = right;
        }

        if (this.data[curIdx] > this.data[smallIdx]) {
          this.swap(smallIdx, curIdx);
          curIdx = smallIdx;
          left = smallIdx * 2;
          right = smallIdx * 2 + 1;
        } else {
          break;
        }
      }
    }
    // this.toString();
    return result;
  }

  toString() {
    console.log(this.data, this.size());
  }
}

const path =
  process.platform === "linux" ? "/dev/stdin" : __dirname + "\\data.txt";
const input = require("fs").readFileSync(path).toString().split(/\r?\n/);

let lineIdx = 0;
const N = Number(input[lineIdx++]);
const arr = [];
for (let i = 0; i < N; i++) {
  arr.push(Number(input[lineIdx++]));
}

function solution(N, arr) {
  let answer = 0;
  const heap = new Heap();
  for (let number of arr) {
    heap.push(number);
  }

  while (heap.size() > 1) {
    let a = heap.pop();
    let b = heap.pop();
    heap.push(a + b);
    answer += a + b;
  }

  console.log(answer);
}

solution(N, arr);
