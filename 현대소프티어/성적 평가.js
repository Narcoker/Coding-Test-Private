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
  const N = Number(lines[lineIdx++]);
  const arr = [];
  for (let i = 0; i < 3; i++) {
    const scores = lines[lineIdx++].split(" ").map(Number);
    const scoresWithIdx = [];
    for (let i = 0; i < scores.length; i++) {
      scoresWithIdx.push([i, scores[i]]);
    }
    scoresWithIdx.sort((a, b) => b[1] - a[1]);
    arr.push(scoresWithIdx);
  }

  const sum = new Array(N).fill(0);

  for (let scores of arr) {
    let prevRate = 1;
    let prevScore = scores[0];
    const result = new Array(N).fill(0);
    for (let i = 0; i < N; i++) {
      let [idx, score] = scores[i];
      sum[idx] += score;
      if (prevScore !== score) {
        result[idx] = i + 1;
        prevRate = i + 1;
      } else {
        result[idx] = prevRate;
      }
      prevScore = score;
    }

    console.log(result.join(" "));
  }

  const sumWithIdx = [];
  for (let i = 0; i < sum.length; i++) {
    sumWithIdx.push([i, sum[i]]);
  }

  sumWithIdx.sort((a, b) => b[1] - a[1]);

  let prevSumScore = sumWithIdx[0];
  const sum_result = new Array(N).fill(0);
  prevRate = 1;
  for (let i = 0; i < N; i++) {
    let [idx, score] = sumWithIdx[i];
    sum[idx] += score;

    if (prevSumScore !== score) {
      sum_result[idx] = i + 1;
      prevRate = i + 1;
    } else {
      sum_result[idx] = prevRate;
    }
    prevSumScore = score;
  }

  console.log(sum_result.join(" "));
});
