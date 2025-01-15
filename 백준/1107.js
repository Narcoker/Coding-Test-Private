const path =
  process.platform === 'linux' ? '/dev/stdin' : __dirname + '\\data.txt';
const input = require('fs').readFileSync(path).toString().split(/\r?\n/);

const N = Number(input[0]);
const M = Number(input[1]);
const brokenButton = M > 0 ? input[2].split(' ').map(Number) : [];

function solution(N, M, brokenButton) {
  let answer = Math.abs(N - 100);
  for (let channel = 0; channel < 1_000_000; channel++) {
    let str_channel = channel.toString();
    let canGo = true;
    for (let number of str_channel) {
      if (brokenButton.includes(Number(number))) {
        canGo = false;
        break;
      }
    }
    if (canGo) {
      answer = Math.min(answer, str_channel.length + Math.abs(N - channel));
    }
  }
  console.log(answer);
}

solution(N, M, brokenButton);

/*
# +버튼
+1

# -버튼
-1
채널 0에서 누르면 변하지 않음

# 0~9버튼

80_000 [70_000(5), 100_000(6)] => [80_000(10_000), 80000(20000)]
500_000 [511_111(6), 555_555(6)] => [500_000(11111), 500_000(55_555)]
*/
