const path =
  process.platform === "linux" ? "/dev/stdin" : __dirname + "\\data.txt";
const input = require("fs").readFileSync(path).toString().trim().split(/\r?\n/);

let lineIdx = 0;
const [N, M] = input[lineIdx++].split(" ").map(Number);
const arr = [];
for (let i = 0; i < N; i++) {
  arr.push(input[lineIdx++].split("").map(Number));
}

function dfs(startY, startX, arr, bucketName, name, countArr) {
  const N = arr.length;
  const M = arr[0].length;
  const stack = [];
  const vectors = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const visited = [[startY, startX]];
  let result = 1;
  stack.push([startY, startX, 1]);
  bucketName[startY][startX] = name;

  while (stack.length > 0) {
    let [curY, curX, count] = stack.pop();

    for (let [dy, dx] of vectors) {
      let [nextY, nextX, nextCount] = [curY + dy, curX + dx, count + 1];

      if (!(0 <= nextY && nextY < N && 0 <= nextX && nextX < M)) continue;
      if (bucketName[nextY][nextX] !== 0) continue;
      if (arr[nextY][nextX] === 1) continue;

      stack.push([nextY, nextX, nextCount]);
      visited.push([nextY, nextX]);
      result += 1;
      bucketName[nextY][nextX] = name;
    }
  }

  for (let [y, x] of visited) {
    countArr[y][x] = result % 10;
  }
}

function solution(N, M, arr) {
  const result = Array.from(new Array(N), () => new Array(M).fill(0));
  const bucketName = Array.from(new Array(N), () => new Array(M).fill(0));
  const countArr = Array.from(new Array(N), () => new Array(M).fill(0));
  let name = 1;
  for (let startY = 0; startY < N; startY++) {
    for (let startX = 0; startX < M; startX++) {
      if (arr[startY][startX] === 0 && bucketName[startY][startX] === 0) {
        dfs(startY, startX, arr, bucketName, name++, countArr);
      }
    }
  }

  const vectors = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  for (let startY = 0; startY < N; startY++) {
    for (let startX = 0; startX < M; startX++) {
      if (arr[startY][startX] === 1) {
        let sum = 1;
        const visitedBucket = new Set();
        for (let [dy, dx] of vectors) {
          let [nextY, nextX] = [startY + dy, startX + dx];

          if (!(0 <= nextY && nextY < N && 0 <= nextX && nextX < M)) continue;

          let name = bucketName[nextY][nextX];
          if (visitedBucket.has(name)) continue;

          sum += countArr[nextY][nextX];
          visitedBucket.add(name);
        }

        result[startY][startX] = sum % 10;
      }
    }
  }

  console.log("이름");
  for (let row of bucketName) {
    console.log(row.join(""));
  }
  console.log();

  console.log("개수");
  for (let row of countArr) {
    console.log(row.join(""));
  }
  console.log();

  console.log("결과");
  for (let row of result) {
    console.log(row.join(""));
  }
}

solution(N, M, arr);
