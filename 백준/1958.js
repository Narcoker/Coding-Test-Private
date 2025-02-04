const path =
  process.platform === 'linux' ? '/dev/stdin' : __dirname + '\\data.txt';
const input = require('fs').readFileSync(path).toString().split(/\r?\n/);

const s1 = input[0];
const s2 = input[1];
const s3 = input[2];

function solution(s1, s2, s3) {
  console.log(lcs(s1, s2, s3));
}

function lcs(s1, s2, s3) {
  let s1Len = s1.length;
  let s2Len = s2.length;
  let s3Len = s3.length;

  const dp = Array.from({ length: s1Len + 1 }, () =>
    Array.from({ length: s2Len + 1 }, () => new Array(s3Len + 1).fill(0)),
  );

  for (let i = 1; i <= s1Len; i++) {
    for (let j = 1; j <= s2Len; j++) {
      for (let k = 1; k <= s3Len; k++) {
        if (s1[i - 1] === s2[j - 1] && s2[j - 1] === s3[k - 1]) {
          dp[i][j][k] = dp[i - 1][j - 1][k - 1] + 1;
        } else {
          dp[i][j][k] = Math.max(
            dp[i - 1][j][k],
            dp[i][j - 1][k],
            dp[i][j][k - 1],
          );
        }
      }
    }
  }

  return dp[s1Len][s2Len][s3Len];
}

solution(s1, s2, s3);
