const path =
  process.platform === "linux" ? "/dev/stdin" : __dirname + "\\data.txt";
const input = require("fs").readFileSync(path).toString().split(/\r?\n/);

const [N, S] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);
let answer = 0;

function solution(N, S, arr) {
  add(0, 0, arr, S);
  console.log(answer);
}

function add(sum, index, arr, S) {
  // 종료 조건: 인덱스가 배열 끝에 도달했을 때
  if (index === arr.length) {
    return;
  }

  // 현재 원소를 선택한 경우
  if (sum + arr[index] === S) {
    answer++;
  }
  add(sum + arr[index], index + 1, arr, S); // 현재 원소를 포함한 경우
  add(sum, index + 1, arr, S); // 현재 원소를 포함하지 않은 경우
}

solution(N, S, arr);
