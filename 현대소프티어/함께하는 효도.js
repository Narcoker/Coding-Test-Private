const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];
let friend_length = 0;
let answer = 0;
rl.on("line", (line) => {
  lines.push(line);
}).on("close", () => {
  const [n, m] = lines[0].split(" ").map(Number);
  const maze = [];
  for (let i = 0; i < n; i++) maze.push(lines[i + 1].split(" ").map(Number));

  const start_pos = [];
  for (let i = 0; i < m; i++) {
    let [start_y, start_x] = lines[n + 1 + i].split(" ").map(Number);
    start_pos.push([start_y - 1, start_x - 1]);
  }
  friend_length = m;

  const visited = Array.from(new Array(n), () => new Array(n).fill(false));
  visited[start_pos[0][0]][start_pos[0][1]] = true;
  dfs(
    0,
    start_pos[0],
    maze,
    visited,
    maze[start_pos[0][0]][start_pos[0][1]],
    0,
    start_pos
  );
  console.log(answer);
});

function dfs(
  friend,
  cur_pos,
  maze,
  visited,
  prev_sum,
  cur_move_count,
  start_pos
) {
  if (cur_move_count === 3) {
    if (friend + 1 === friend_length) {
      // 만약 friend 인덱스 값이 m 라면:
      answer = Math.max(answer, prev_sum); // answer = max(answer, prev_sum)
      return; // return
    }

    visited[start_pos[friend + 1][0]][start_pos[friend + 1][1]] = true;
    dfs(
      friend + 1,
      start_pos[friend + 1],
      maze,
      visited,
      prev_sum + maze[start_pos[friend + 1][0]][start_pos[friend + 1][1]],
      0,
      start_pos
    );
    visited[start_pos[friend + 1][0]][start_pos[friend + 1][1]] = false;
    return;
  }

  const n = maze.length;
  const vectors = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]; // 방향 선언

  let [cur_y, cur_x] = cur_pos;
  for (let [dy, dx] of vectors) {
    // 방향 순회
    let [next_y, next_x] = [cur_y + dy, cur_x + dx]; // 다음 위치, 및 다음 누적값, 다음 이동 횟수 구하기

    if (!(0 <= next_y && next_y < n && 0 <= next_x && next_x < n))
      // 다음 위치가 미로 밖이면:
      continue; // continue;

    if (visited[next_y][next_x])
      // 다음 위치가 방문한 곳이면:
      continue; // continue;

    let next_result = prev_sum + maze[next_y][next_x];
    let next_move_count = cur_move_count + 1;

    visited[next_y][next_x] = true;
    dfs(
      friend,
      [next_y, next_x],
      maze,
      visited,
      next_result,
      next_move_count,
      start_pos
    );
    visited[next_y][next_x] = false;
  }
}
