const path =
  process.platform === "linux" ? "/dev/stdin" : __dirname + "\\data.txt";
const input = require("fs").readFileSync(path).toString().split(/\r?\n/);

let N = Number(input[0]);
const arr = [];
for (let i = 1; i < N + 1; i++) {
  arr.push(Number(input[i]));
}

function solution(N, arr) {
  const triNumber = [];
  const isTriNumber = new Array(1001).fill(0);

  // 삼각수 미리 구하기. 삼각수의 합의 범위는 1~1000 이므로  44까지만 구하면 된다. T(44) = 990
  for (let i = 0; i < 45; i++) {
    triNumber.push((i * (i + 1)) / 2);
  }

  for (let n1 = 1; n1 < 45; n1++) {
    for (let n2 = 1; n2 < 45; n2++) {
      for (let n3 = 1; n3 < 45; n3++) {
        let result = triNumber[n1] + triNumber[n2] + triNumber[n3];
        if (result <= 1000) isTriNumber[result] = 1;
      }
    }
  }

  for (let target of arr) {
    console.log(isTriNumber[target]);
  }
}

solution(N, arr);
