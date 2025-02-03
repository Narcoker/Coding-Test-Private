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
  const arr = input[1].split(' ').map(Number);
  const dp = new Array(N).fill(1);

  for (let target = 0; target < N; target++) {
    for (let prev = 0; prev < target; prev++) {
      if (arr[prev] < arr[target])
        dp[target] = Math.max(dp[target], dp[prev] + 1);
    }
  }

  console.log(Math.max(...dp));
});
