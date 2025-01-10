const path =
  process.platform === "linux" ? "/dev/stdin" : __dirname + "\\data.txt";
const input = require("fs").readFileSync(path).toString().split(/\r?\n/);

const N = Number(input[0]);
const arr = input[1].split(" ").map(Number);

function solution(N, arr) {
  const stack = [];
  const answer = new Array(N).fill(0);

  for (let i = N - 1; i >= 0; i--) {
    if (stack.length === 0 || stack.at(-1).value > arr[i])
      stack.push({value: arr[i], index: i});
    else {
      while (stack.length > 0 && stack.at(-1).value < arr[i]) {
        answer[stack.at(-1).index] = i + 1;
        stack.pop();
      }
      stack.push({value: arr[i], index: i});
    }
  }

  console.log(answer.join(" "));
}

solution(N, arr);
