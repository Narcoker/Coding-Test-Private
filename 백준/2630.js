const path =
  process.platform === 'linux' ? '/dev/stdin' : __dirname + '\\data.txt';
const input = require('fs').readFileSync(path).toString().split(/\r?\n/);

const N = Number(input[0]);
const arr = [];
for (let i = 1; i < N + 1; i++) {
  arr.push(input[i].split(' ').map(Number));
}

let answer = [0, 0];
function solution(N, arr) {
  check([0, 0], N);

  console.log(answer[0]);
  console.log(answer[1]);
}

function check(start, n) {
  let [startY, startX] = start;
  let color = arr[startY][startX];
  for (let row = startY; row < startY + n; row++) {
    for (let col = startX; col < startX + n; col++) {
      if (color !== arr[row][col]) {
        let m = n / 2;
        check([startY, startX], m);
        check([startY, startX + m], m);
        check([startY + m, startX], m);
        check([startY + m, startX + m], m);
        return;
      }
    }
  }

  answer[color]++;
}

solution(N, arr);
