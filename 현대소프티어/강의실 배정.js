const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];

rl.on('line', line => {
  input.push(line);
}).on('close', () => {
  const N = Number(input[0]);
  const arr = [];
  for (let i = 1; i < N + 1; i++) {
    arr.push(input[i].split(' ').map(Number));
  }
  arr.sort((a, b) => {
    if (a[1] !== b[1]) return a[1] - b[1];
    else return a[0] - b[0];
  });
  let answer = 0;
  let canEnterTime = 0;
  for (let [start, end] of arr) {
    if (start >= canEnterTime) {
      answer++;
      canEnterTime = end;
    }
  }

  console.log(answer);
});
