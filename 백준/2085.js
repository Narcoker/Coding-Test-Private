const path =
  process.platform === "linux" ? "/dev/stdin" : __dirname + "\\data.txt";
const input = require("fs").readFileSync(path).toString().split(/\r?\n/);

const N = Number(input[0]);
const arr = [];
for (let i = 1; i < N + 1; i++) {
  arr.push(input[i].split(""));
}

function getMaxlength(N, arr) {
  let result = 1; // 결과 값 = 1

  for (let i = 0; i < N; i++) {
    // 행 순회 50
    let len = 1; // 누적 길이 1
    let preValue = arr[i][0]; // 이전 값 = 행[0]
    for (let k = 1; k < N; k++) {
      // 값 순회 (1~행 끝)
      if (preValue === arr[i][k]) {
        // 이전 값이량 현재 값이랑 같으면
        len += 1; // 누적 길이 + 1
        result = Math.max(result, len); // Math.max(결과값, 누적 길이)
      } else {
        // 그렇지 않으면
        len = 1;
        preValue = arr[i][k];
      }
    }
  }

  for (let i = 0; i < N; i++) {
    // 행 순회 50
    let len = 1; // 누적 길이 1
    let preValue = arr[0][i]; // 이전 값 = 행[0]
    for (let k = 1; k < N; k++) {
      // 값 순회 (1~행 끝)
      if (preValue === arr[k][i]) {
        // 이전 값이량 현재 값이랑 같으면
        len += 1; // 누적 길이 + 1
        result = Math.max(result, len); // Math.max(결과값, 누적 길이)
      } else {
        // 그렇지 않으면
        len = 1;
        preValue = arr[k][i];
      }
    }
  }
  return result;
}

function solution(N, arr) {
  let answer = 0;
  const vectors = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ];

  for (let row = 0; row < N; row++) {
    // row 탐색 50
    for (let col = 0; col < N; col++) {
      // col 탐색 50
      for (let [dy, dx] of vectors) {
        // 4방향 타켓 탐색 4
        let nextY = row + dy;
        let nextX = col + dx;

        if (!(0 <= nextY && nextY < N && 0 <= nextX && nextX < N)) continue; // 타겟 위치 영역 밖이면 conitnue

        if (arr[row][col] !== arr[nextY][nextX]) {
          // 현재 위치와 타켓 위치의 값이 다르면
          [arr[row][col], arr[nextY][nextX]] = [
            arr[nextY][nextX],
            arr[row][col],
          ]; // 현재 위치, 타겟 위치 swap

          let maxLength = getMaxlength(N, arr); // 가장 긴 연속 부분의 길이 구하기
          answer = Math.max(answer, maxLength); // answer = Math.max(answer, 길이이)
          [arr[row][col], arr[nextY][nextX]] = [
            arr[nextY][nextX],
            arr[row][col],
          ]; // 현재 위치, 타겟 위치 swap
        }
      }
    }
  }

  console.log(answer);
}

solution(N, arr);
