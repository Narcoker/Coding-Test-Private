const path =
  process.platform === "linux" ? "/dev/stdin" : __dirname + "\\data.txt";
const input = require("fs").readFileSync(path).toString().split("\n");

let [N, arr] = [Number(input[0]), input[1].split(" ").map(Number)];

function solution1(N, arr) {
  const upDP = new Array(N).fill(1);

  for (let curIndex = 1; curIndex < N; curIndex++) {
    for (let preIndex = 0; preIndex < curIndex; preIndex++) {
      if (arr[preIndex] < arr[curIndex]) {
        upDP[curIndex] = Math.max(upDP[curIndex], upDP[preIndex] + 1);
      }
    }
  }

  for (let startIndex = 0; startIndex < N; startIndex++) {
    let arrSlice = arr.slice(startIndex, N);
    arrSlice = arrSlice.filter((value) => value <= arrSlice[0]);
    // console.log(arrSlice);
    const downDP = new Array(arrSlice.length).fill(1);
    for (let curIndex = 0; curIndex < N; curIndex++) {
      for (let preIndex = 0; preIndex < curIndex; preIndex++) {
        if (arrSlice[preIndex] > arrSlice[curIndex])
          downDP[curIndex] = Math.max(downDP[curIndex], downDP[preIndex] + 1);
      }
    }
    upDP[startIndex] += Math.max(...downDP) - 1;
  }

  return Math.max(...upDP);
}

let answer = solution1(N, arr);
console.log(answer);

function solution2(N, arr) {
  const upDP = new Array(N).fill(1);
  const downDP = new Array(N).fill(1);
  for (let curIndex = 1; curIndex < N; curIndex++) {
    for (let preIndex = 0; preIndex < curIndex; preIndex++) {
      if (arr[preIndex] < arr[curIndex]) {
        upDP[curIndex] = Math.max(upDP[curIndex], upDP[preIndex] + 1);
      }

      if (arr[preIndex] > arr[curIndex]) {
        downDP[curIndex] = Math.max(downDP[curIndex], downDP[preIndex] + 1);
      }
    }
  }
  console.log(upDP, downDP);

  let resultDP = new Array(N).fill(0);
  for (let i = 0; i < N; i++) {
    resultDP[i] = upDP[i] + downDP[N - 1 - i] - 1;
  }

  return Math.max(...resultDP);
}

answer = solution2(N, arr);
console.log(answer);
