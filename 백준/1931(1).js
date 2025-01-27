const path =
  process.platform === 'linux' ? '/dev/stdin' : __dirname + '\\data.txt';
const input = require('fs').readFileSync(path).toString().split(/\r?\n/);

const N = Number(input[0]);
const rooms = [];
for (let i = 1; i < N + 1; i++) {
  rooms.push(input[i].split(' ').map(Number));
}

function solution(N, rooms) {
  rooms.sort((a, b) => {
    if (a[1] !== b[1]) return a[1] - b[1];
    else return a[0] - b[0];
  });

  let canUseTime = 0;
  let answer = 0;
  for (let [start, end] of rooms) {
    if (canUseTime <= start) {
      answer++;
      canUseTime = end;
      console.log(start, end);
    }
  }

  console.log(answer);
}

solution(N, rooms);
