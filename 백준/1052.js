const path =
  process.platform === 'linux' ? '/dev/stdin' : __dirname + '\\data.txt';
const [N, K] = require('fs')
  .readFileSync(path)
  .toString()
  .split(' ')
  .map(Number);

function solution(N, K) {
  let count = 0;

  while (true) {
    let temp = N;
    let oneCount = 0;

    while (temp > 0) {
      oneCount += temp % 2;
      temp = Math.floor(temp / 2);
    }

    if (oneCount > K) {
      N++;
      count++;
    } else {
      break;
    }
  }

  console.log(count);
}

solution(N, K);
