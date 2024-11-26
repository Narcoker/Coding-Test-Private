const path =
  process.platform === "linux" ? "/dev/stdin" : __dirname + "\\data.txt";
const input = require("fs").readFileSync(path).toString().trim().split(/\r?\n/);

let lineIdx = 0;
const [N, M] = input[lineIdx++].split(" ").map(Number);
const robot = input[lineIdx++].split(" ").map(Number);
const room = [];
for (let i = 0; i < N; i++) {
  room.push(input[lineIdx++].split(" ").map(Number));
}

function solution(N, M, robot, room) {
  const isVisited = Array.from(new Array(N), () => new Array(M).fill(false));
  const vectors = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  let [curY, curX, curV] = robot;
  let answer = 0;

  while (true) {
    if (!isVisited[curY][curX]) {
      // 청소되지 않은 경우
      isVisited[curY][curX] = true;
      answer++;
    }

    let isSearch = false;
    for (let [dy, dx] of vectors) {
      let [serachY, searchX] = [curY + dy, curX + dx];

      if (!(0 <= serachY && serachY < N && 0 <= searchX && searchX < M))
        continue;

      if (!isVisited[serachY][searchX] && room[serachY][searchX] === 0) {
        // 주변 4칸중 청소되지 않은 빈칸이 있는 경우
        curV = (curV - 1 >= 0 ? curV - 1 : 4 + (curV - 1)) % 4; // 반시계 방향 회전
        let [nextY, nextX] = [curY + vectors[curV][0], curX + vectors[curV][1]];

        if (!(0 <= nextY && nextY < N && 0 <= nextX && nextX < M)) continue;

        if (!isVisited[nextY][nextX] && room[nextY][nextX] === 0) {
          // 바라보는 방향 기준으로 앞쪽칸이 청소되지 않은 빈칸이면
          [curY, curX] = [nextY, nextX];
        }
        isSearch = true;
        break;
      }
    }

    if (isSearch) continue;

    let backV = (curV + 2) % 4;
    let [backY, backX] = [curY + vectors[backV][0], curX + vectors[backV][1]];

    if (!(0 <= backY && backY < N && 0 <= backX && backX < M)) continue;

    if (room[backY][backX] === 0) {
      [curY, curX] = [backY, backX];
    } else {
      console.log(answer);
      return;
    }
  }
}

solution(N, M, robot, room);
