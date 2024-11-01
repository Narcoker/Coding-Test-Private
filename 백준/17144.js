const fs = require("fs");
const input = fs
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "\\data.txt"
  )
  .toString()
  .split("\n");

const [R, C, T] = input[0].split(" ").map(Number);
const board = [];
const machineStart = [];
for (let i = 1; i <= R; i++) {
  let rowData = input[i].split(" ").map(Number);

  const row = i - 1;
  for (let col = 0; col < C; col++) {
    if (rowData[col] === -1) machineStart.push([row, col]);
  }
  board.push(rowData);
}

const dy = [-1, 1, 0, 0];
const dx = [0, 0, -1, 1];

for (let time = 1; time <= T; time++) {
  const tempBoard = Array.from(new Array(R), () => new Array(C).fill(0));

  for (let row = 0; row < R; row++) {
    for (let col = 0; col < C; col++) {
      if (board[row][col] === 0 || board[row][col] === -1) continue;

      let spreadDust = Math.floor(board[row][col] / 5);

      let spreadCount = 0;
      for (let i = 0; i < 4; i++) {
        let targetY = row + dy[i];
        let targetX = col + dx[i];

        if (0 <= targetY && targetY < R && 0 <= targetX && targetX < C) {
          if (board[targetY][targetX] !== -1) {
            tempBoard[targetY][targetX] += spreadDust;
            spreadCount++;
          }
        }
      }

      board[row][col] -= spreadDust * spreadCount;
    }
  }

  for (let row = 0; row < R; row++) {
    for (let col = 0; col < C; col++) {
      board[row][col] += tempBoard[row][col];
    }
  }

  clean(0, machineStart[0]);
  clean(1, machineStart[1]);
}

let answer = 0;

for (let row = 0; row < R; row++) {
  for (let col = 0; col < C; col++) {
    if (board[row][col] === -1) continue;
    answer += board[row][col];
  }
}

console.log(answer);

function clean(mode, [startY, startX]) {
  const directions = [
    [
      [0, 1],
      [-1, 0],
      [0, -1],
      [1, 0],
    ],
    [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ],
  ];

  const selectedDir = directions[mode];
  let dirIndex = 0;
  let curY = startY;
  let curX = startX + 1;
  let preValue = 0;
  let curValue = 0;

  while (board[curY][curX] != -1) {
    curValue = board[curY][curX];
    board[curY][curX] = preValue;
    preValue = curValue;

    let nextY = curY + selectedDir[dirIndex][0];
    let nextX = curX + selectedDir[dirIndex][1];

    if (nextY < 0 || nextY >= R || nextX < 0 || nextX >= C) {
      dirIndex++;
      nextY = curY + selectedDir[dirIndex][0];
      nextX = curX + selectedDir[dirIndex][1];
    }

    [curY, curX] = [nextY, nextX];
  }
}
