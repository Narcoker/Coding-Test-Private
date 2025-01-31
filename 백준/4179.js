const path =
  process.platform === 'linux' ? '/dev/stdin' : __dirname + '\\data.txt';
const input = require('fs').readFileSync(path).toString().split(/\r?\n/);

const [R, C] = input[0].split(' ').map(Number);
const board = [];
for (let i = 1; i < R + 1; i++) {
  board.push(input[i].split(''));
}

function solution(R, C, board) {
  const queue = [];
  const jVisited = Array.from(new Array(R), () => new Array(C).fill(false));

  // 불 큐에 넣기
  for (let row = 0; row < R; row++) {
    for (let col = 0; col < C; col++) {
      if (board[row][col] === 'F') {
        queue.push({ type: 'F', row, col, time: 0 });
      }
    }
  }

  // 지훈이 큐에 넣기
  for (let row = 0; row < R; row++) {
    for (let col = 0; col < C; col++) {
      if (board[row][col] === 'J') {
        queue.push({ type: 'J', row, col, time: 0 });
        jVisited[row][col] = true;
        break;
      }
    }
  }

  const vectors = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  while (queue.length > 0) {
    const { type, row: curY, col: curX, time } = queue.shift();

    for (let [dy, dx] of vectors) {
      let [nextY, nextX] = [curY + dy, curX + dx];

      if (type === 'J') {
        if (curY === R - 1 || curY === 0 || curX === C - 1 || curX === 0) {
          console.log(time + 1);
          return;
        }

        if (!(0 <= nextY && nextY < R && 0 <= nextX && nextX < C)) continue; // 외부 제외
        if (board[nextY][nextX] === '#') continue; // 벽 제외
        if (board[nextY][nextX] === 'F') continue; // 다음칸 불 제외 - 지훈
        if (jVisited[nextY][nextX]) continue;

        board[nextY][nextX] = 'J';
        board[curY][curX] = '.';

        if (nextY === R - 1 || nextX === 0 || nextX === C - 1 || nextX === 0) {
          console.log(time + 2);
          return;
        }

        queue.push({ type, row: nextY, col: nextX, time: time + 1 });
        jVisited[nextY][nextX] = true;
      }

      if (type === 'F') {
        if (!(0 <= nextY && nextY < R && 0 <= nextX && nextX < C)) continue; // 외부 제외
        if (board[nextY][nextX] === '#') continue; // 벽 제외
        if (board[nextY][nextX] === 'F') continue; // 이미 불이라면 안감
        board[nextY][nextX] = 'F';
        queue.push({ type, row: nextY, col: nextX, time: time + 1 });
      }
    }
  }

  console.log('IMPOSSIBLE');
}

solution(R, C, board);
