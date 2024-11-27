const path =
  process.platform === "linux" ? "/dev/stdin" : __dirname + "\\data.txt";
const input = require("fs").readFileSync(path).toString().trim().split(/\r?\n/);

let lineIdx = 0;
const N = Number(input[lineIdx++]);
let schedule = [];
for (let i = 0; i < N; i++) {
  const [t, p] = input[lineIdx++].split(" ").map(Number);
  schedule.push([t, p]);
}

function solution(N, schedule) {
  const dp = new Array(N + 1).fill(0);

  for (let today = 0; today < N; today++) {
    for (
      let moneyDay = today + schedule[today][0];
      moneyDay < N + 1;
      moneyDay++
    ) {
      dp[moneyDay] = Math.max(dp[moneyDay], dp[today] + schedule[today][1]);
    }
  }
  console.log(dp[N]);
}

solution(N, schedule);

/*
import sys
N = int(input())

schedule = [list(map(int, sys.stdin.readline().split())) for i in range(N)]

dp = [0 for i in range(N+1)]

for i in range(N):
    for j in range(i+schedule[i][0], N+1):
        if dp[j] < dp[i] + schedule[i][1]:
            dp[j] = dp[i] + schedule[i][1]

print(dp[-1])
*/
