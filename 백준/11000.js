const fs = require("fs");
const input = fs
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "\\data.txt"
  )
  .toString()
  .split("\n");

let N = Number(input[0]);
const times = [];

for (let i = 1; i <= N; i++) {
  const [start, end] = input[i].split(" ").map(Number);
  times.push({time: start, isStartTime: 1});
  times.push({time: end, isStartTime: -1});
}

times.sort((a, b) => {
  if (a.time > b.time) return 1;
  else if (a.time < b.time) return -1;
  else return a.isStartTime - b.isStartTime;
});

let answer = 0;
let currentCount = 0;
times.forEach((time) => {
  if (time.isStartTime === 1) {
    currentCount++;
  } else if (time.isStartTime === -1) {
    currentCount--;
  }

  answer = Math.max(currentCount, answer);
});

console.log(answer);
