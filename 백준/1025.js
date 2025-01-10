const path =
  process.platform === "linux" ? "/dev/stdin" : __dirname + "\\data.txt";
const input = require("fs").readFileSync(path).toString().split(/\r?\n/);

const [row, col] = input[0].split(" ").map(Number);
const arr = [];
for (let i = 1; i < row + 1; i++) {
  arr.push(input[i].split("").map(Number));
}

function solution(row, col, arr) {
  let answer = -1;
  for (let startY = 0; startY < row; startY++) {
    for (let startX = 0; startX < col; startX++) {
      for (let rowAmount = -row + 1; rowAmount < row; rowAmount++) {
        for (let colAmount = -col + 1; colAmount < col; colAmount++) {
          const result = [];
          let [curY, curX] = [startY, startX];
          while (0 <= curY && curY < row && 0 <= curX && curX < col) {
            result.push(arr[curY][curX]);
            if (rowAmount === 0 && colAmount === 0) {
              break;
            }
            if (Number.isInteger(Math.sqrt(Number(result.join(""))))) {
              answer = Math.max(answer, Number(result.join("")));
            }
            curY += rowAmount;
            curX += colAmount;
          }
        }
      }
    }
  }
  console.log(answer);
}

solution(row, col, arr);
