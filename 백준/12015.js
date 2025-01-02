class Heap {
  constructor() {
    this.data = [null];
  }
  swap(a, b) {
    [this.data[a], this.data[b]] = [this.data[b], this.data[a]];
  }

  size() {
    return this.data.length - 1;
  }

  push(value) {
    this.data.push(value);

    let curIdx = this.size();
    let parIdx = (curIdx / 2) >> 0;

    while (curIdx > 1 && this.data[parIdx][0] < this.data[curIdx][0]) {
      this.swap(curIdx, parIdx);
      curIdx = parIdx;
      parIdx = (curIdx / 2) >> 0;
    }
  }

  pop() {
    const result = this.data[1];

    if (this.size() === 1) {
      this.data = [null];
      return;
    }

    this.data[1] = this.data.pop();
    let curIdx = 1;
    let leftIdx = curIdx * 2;
    let rightIdx = curIdx * 2 + 1;

    while (leftIdx <= this.size()) {
      let maxValueIdx = leftIdx;
      if (
        rightIdx <= this.size() &&
        this.data[leftIdx][0] < this.data[rightIdx][0]
      ) {
        maxValueIdx = rightIdx;
      }

      if (this.data[maxValueIdx][0] > this.data[curIdx][0]) {
        this.swap(maxValueIdx, curIdx);
        curIdx = maxValueIdx;
        leftIdx = curIdx * 2;
        rightIdx = curIdx * 2 + 1;
      } else {
        break;
      }
    }

    return result;
  }
}

const path =
  process.platfrom === "linux" ? "/dev/stdin" : __dirname + "\\data.txt";
const input = require("fs").readFileSync(path).toString().trim().split(/\r?\n/);

let lineIdx = 0;
const N = Number(input[lineIdx++]);
const arr = input[lineIdx++].split(" ").map(Number);

function solution(N, arr) {
  const dp = new Array(N).fill(1);

  const maxHeap = new Heap();
  maxHeap.push([arr[0], 1]);
  for (let curIdx = 1; curIdx < N; curIdx++) {
    let trash = [];
    while (true) {
      Ma;
    }
  }
}

solution(N, arr);
