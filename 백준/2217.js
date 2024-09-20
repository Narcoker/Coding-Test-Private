const path =
  process.platform === "linux" ? "/dev/stdin" : __dirname + "\\data.txt";
const input = require("fs").readFileSync(path).toString().split("\n");

const [N, ...maxWeights] = input.map(Number);

function solution(N, maxWeights) {
  let answer = 0;
  maxWeights.sort((a, b) => a - b);

  for (let i = 0; i < maxWeights.length; i++) {
    let result = maxWeights[i] * (maxWeights.length - i);
    answer = Math.max(answer, result);
  }

  return answer;
}

const answer = solution(N, maxWeights);
console.log(answer);
