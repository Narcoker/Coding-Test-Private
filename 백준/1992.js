const path =
  process.platform === 'linux' ? '/dev/stdin' : __dirname + '\\data.txt';
const input = require('fs').readFileSync(path).toString().split(/\r?\n/);

const N = Number(input[0]);
const arr = [];
for (let i = 1; i < N + 1; i++) {
  arr.push(input[i].split('').map(Number));
}

let answer = '';
function solution(N, arr) {
  let maxRow = arr.length;
  let maxCol = arr[0].length;

  check(0, 0, maxRow, maxCol);
  console.log(answer);
}

function check(startY, startX, amountY, amountX) {
  let color = arr[startY][startX];

  for (let row = startY; row < startY + amountY; row++) {
    for (let col = startX; col < startX + amountX; col++) {
      if (arr[row][col] !== color) {
        answer += '(';
        let nextAmountY = amountY / 2;
        let nextAmountX = amountX / 2;
        check(startY, startX, nextAmountY, nextAmountX);
        check(startY, startX + nextAmountX, nextAmountY, nextAmountX);
        check(startY + nextAmountY, startX, nextAmountY, nextAmountX);
        check(
          startY + nextAmountY,
          startX + nextAmountX,
          nextAmountY,
          nextAmountX,
        );
        answer += ')';
        return;
      }
    }
  }

  answer += String(color);
}

solution(N, arr);
