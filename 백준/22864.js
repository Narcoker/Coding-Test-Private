const fs = require("fs");
const input = fs
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "\\data.txt"
  )
  .toString();

let [A, B, C, M] = input.split(" ").map(Number);

// 1시간 일하면 A 만큼 피로도 쌓임
// 1시간 일하면 B 만큼 일처리
// 1시간 쉬면 C만큼 회복, 피로도는 0 이하로 내려가지 않는다.
// 최대 피로도 M, M을 넘으면 그만 둠
// 24시간 동안일 할 예정

let tired = 0;
let worked = 0;

for (let hour = 0; hour < 24; hour++) {
  let next_tired = tired + A;
  let next_worked = worked + B;

  if (next_tired <= M) {
    worked = next_worked;
    tired = next_tired;
    continue;
  }

  tired -= C;
  if (tired < 0) tired = 0;
}

console.log(worked);
