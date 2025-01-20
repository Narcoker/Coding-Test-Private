const path =
  process.platform === 'linux' ? '/dev/stdin' : __dirname + '\\data.txt';
const input = require('fs').readFileSync(path).toString().split(/\r?\n/);

const [N, K] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').map(Number);

function solution(N, K, arr) {
  let answer = 0;
  let counter = {};

  let len = 0;
  let left = 0;
  let right = 0;

  while (left <= right) {
    if (right === N) break;

    if (!counter[arr[right]]) {
      counter[arr[right]] = 1;
      right++;
    } else {
      if (counter[arr[right]] + 1 <= K) {
        counter[arr[right]]++;
        right++;
      } else {
        for (let i = left; i <= right; i++) {
          counter[arr[i]]--;
          if (counter[arr[i]] === 0) {
            delete counter[arr[i]];
          }

          if (!counter[arr[right]] || counter[arr[right]] <= K) {
            left = i + 1;
            break;
          }
        }
      }
    }

    answer = Math.max(answer, right - left);
  }

  console.log(answer);
}

solution(N, K, arr);
