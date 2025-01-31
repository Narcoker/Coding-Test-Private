// 본인 포함 왼쪽에서 가장 큰거 저장
// 본인 미포함 오른쪽에서 가장 큰거 저장
// 왼쪽 Max 오른쪽 Max 비교
//  왼쪽이 더 작으면 왼쪽 꺼 누적
//  왼쪽이 더 크거나 같으면 오른쪽 꺼 누적

const path =
  process.platform == 'linux' ? '/dev/stdin' : __dirname + '\\data.txt';
const input = require('fs').readFileSync(path).toString().split(/\r?\n/);

const N = Number(input[0]);
const arr = new Array(1000 + 1).fill(0);
for (let i = 1; i < N + 1; i++) {
  const [L, H] = input[i].split(' ').map(Number);
  arr[L] = H;
}

function solution(N, arr) {
  let prevMaxHeights = new Array(1000 + 1).fill(0);
  let prevMaxHeight = 0;
  for (let i = 0; i < prevMaxHeights.length; i++) {
    prevMaxHeights[i] = Math.max(prevMaxHeight, arr[i]);
    if (prevMaxHeight < arr[i]) prevMaxHeight = arr[i];
  }

  let postMaxHeights = new Array(1000 + 1).fill(0);
  let postMaxHeight = 0;
  for (let i = postMaxHeights.length - 1; i >= 0; i--) {
    postMaxHeights[i] = Math.max(postMaxHeight, arr[i]);
    if (postMaxHeight < arr[i]) postMaxHeight = arr[i];
  }

  let answer = 0;
  for (let i = 1; i < 1000 + 1; i++) {
    if (prevMaxHeights[i] < postMaxHeights[i]) answer += prevMaxHeights[i];
    else answer += postMaxHeights[i];
  }

  console.log(answer);
}

solution(N, arr);
