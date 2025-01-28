const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];

rl.on('line', line => {
  input.push(line);
}).on('close', () => {
  const [N, M] = input[0].split(' ').map(Number);
  const weights = input[1].split(' ').map(Number);
  const relations = [];
  for (let i = 2; i < M + 2; i++) {
    relations.push(input[i].split(' ').map(Number));
  }

  let thinkKing = new Array(N + 1).fill(true);
  for (let [p1, p2] of relations) {
    if (weights[p1 - 1] < weights[p2 - 1]) {
      thinkKing[p1] = false;
    } else if (weights[p1 - 1] > weights[p2 - 1]) {
      thinkKing[p2] = false;
    } else if (weights[p1 - 1] === weights[p2 - 1]) {
      thinkKing[p1] = false;
      thinkKing[p2] = false;
    }
  }

  let answer = 0;
  for (let i = 1; i < N + 1; i++) {
    if (thinkKing[i]) answer++;
  }
  console.log(answer);
  process.exit(0);
});
