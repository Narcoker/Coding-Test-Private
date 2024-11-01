const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];
rl.on("line", (line) => {
  lines.push(line);
}).on("close", () => {
  let lineIdx = 0;
  const [N, B] = lines[lineIdx++].split(" ").map(Number);
  const arr = lines[lineIdx++].split(" ").map(Number);
  arr.sort((a, b) => a - b);

  let left = arr[0];
  let right = arr[arr.length - 1] + Math.floor(Math.sqrt(B));
  let answer = 0;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    let needBudget = upgrade(mid, arr);

    if (needBudget <= B) {
      left = mid + 1;
      answer = Math.max(mid, answer);
    } else {
      right = mid - 1;
    }
  }

  console.log(answer);
});

function upgrade(target, arr) {
  let sumBudget = 0;

  for (let speed of arr) {
    let diff = target - speed > 0 ? target - speed : 0;
    sumBudget += diff ** 2;
  }

  return sumBudget;
}
