const fs = require('fs');
const path =
  process.platform === 'linux' ? '/dev/stdin' : __dirname + '\\data.txt';
const input = fs.readFileSync(path).toString().split(/\r?\n/);

const [N, K] = input[0].split(' ').map(Number);
const A = input[1].split(' ').map(Number);

function solution(N, K, A) {
  let hasRobot = new Array(2 * N).fill(false);
  let turn = 0;
  let zeroCount = 0; // 내구도 0인 칸의 개수

  while (true) {
    turn++;

    // 1. 벨트 회전
    A.unshift(A.pop());
    hasRobot.unshift(hasRobot.pop());

    // 내리는 위치(N-1)에 로봇이 있으면 즉시 내림
    if (hasRobot[N - 1]) hasRobot[N - 1] = false;

    // 2. 로봇 이동 (뒤에서부터 이동 처리)
    for (let i = N - 2; i >= 0; i--) {
      if (hasRobot[i] && !hasRobot[i + 1] && A[i + 1] > 0) {
        hasRobot[i] = false;
        hasRobot[i + 1] = true;
        A[i + 1]--;

        if (A[i + 1] === 0) zeroCount++;

        // 내리는 위치(N-1)에 도달한 경우 로봇 제거
        if (i + 1 === N - 1) hasRobot[i + 1] = false;
      }
    }

    // 3. 올리는 위치(0)에 로봇 올리기
    if (A[0] > 0) {
      hasRobot[0] = true;
      A[0]--;
      if (A[0] === 0) zeroCount++;
    }

    // 4. 내구도 0인 칸 개수 확인
    if (zeroCount >= K) break;
  }

  console.log(turn);
}

solution(N, K, A);
