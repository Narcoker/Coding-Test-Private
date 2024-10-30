class Queue {
  constructor() {
    this.data = {};
    this.front = 0;
    this.rear = 0;
  }

  size() {
    return this.rear - this.front;
  }

  append(value) {
    this.data[this.rear++] = value;
  }

  pop() {
    if (this.size() === 0) return 0;

    const result = this.data[this.front];
    delete this.data[this.front++];
    return result;
  }

  state() {
    console.log(this.data);
    console.log(`front: ${this.front}, rear: ${this.rear}`);
  }
}

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];
let answer = 0;

rl.on("line", (line) => {
  lines.push(line);
}).on("close", () => {
  let lineIdx = 0;
  const [H, K, R] = lines[lineIdx++].split(" ").map(Number);

  const workers = [null];

  for (let height = 0; height <= H; height++) {
    for (let i = 0; i < 2 ** height; i++)
      workers.push([new Queue(), new Queue()]);
  }

  let curWorker = 2 ** H;

  for (let i = 0; i < 2 ** H; i++) {
    const works = lines[lineIdx++].split(" ").map(Number);

    for (let work of works) {
      workers[curWorker + i][0].append(work);
    }
  }

  for (let day = 1; day <= R; day++) {
    for (let i = 1; i < workers.length; i++) {
      work(workers, i, day);
    }
  }

  console.log(answer);
});

function work(workers, curWorker, day) {
  let maxHeight = Math.log2(workers.length) - 1;
  let curWorkerHeight = Math.floor(Math.log2(curWorker));
  let parent = Math.floor(curWorker / 2);
  let parent_left = parent * 2;
  let parent_right = parent * 2 + 1;

  if (curWorkerHeight === maxHeight) {
    let completeWork = workers[curWorker][0].pop();
    if (curWorker === parent_left && completeWork !== 0)
      workers[parent][0].append(completeWork);
    else if (curWorker === parent_right && completeWork !== 0)
      workers[parent][1].append(completeWork);
  } else {
    if (day % 2 === 1) {
      let completeWork = workers[curWorker][0].pop();

      if (curWorker === 1) {
        answer += completeWork;
      } else {
        if (curWorker === parent_left && completeWork !== 0)
          workers[parent][0].append(completeWork);
        else if (curWorker === parent_right && completeWork !== 0)
          workers[parent][1].append(completeWork);
      }
    } else {
      let completeWork = workers[curWorker][1].pop();
      if (curWorker === 1) {
        answer += completeWork;
      } else {
        if (curWorker === parent_left && completeWork !== 0)
          workers[parent][0].append(completeWork);
        else if (curWorker === parent_right && completeWork !== 0)
          workers[parent][1].append(completeWork);
      }
    }
  }
}
