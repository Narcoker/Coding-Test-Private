const path =
  process.platform === 'linux' ? '/dev/stdin' : __dirname + '\\data.txt';
const input = require('fs').readFileSync(path).toString().split(/\r?\n/);

const s1 = input[0];
const s2 = input[1];

function solution(s1, s2) {
  let s1Len = s1.length;
  let s2Len = s2.length;

  const dp = Array.from({ length: s1Len + 1 }, () =>
    new Array(s2Len + 1).fill(''),
  );

  for (let i = 1; i <= s1Len; i++) {
    for (let j = 1; j <= s2Len; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + s2[j - 1];
      } else {
        dp[i][j] =
          dp[i - 1][j].length > dp[i][j - 1].length
            ? dp[i - 1][j]
            : dp[i][j - 1];
      }
    }
  }
  console.log(dp[s1Len][s2Len].length);
  console.log(dp[s1Len][s2Len]);
}

solution(s1, s2);
