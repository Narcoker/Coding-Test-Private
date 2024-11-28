function solution(maps) {
  var answer = [];
  const N = maps.length;
  const M = maps[0].length;
  const isVisited = Array.from({length: N}, () => new Array(M).fill(false));

  for (let row = 0; row < N; row++) {
    for (let col = 0; col < M; col++) {
      if (!isVisited[row][col] && maps[row][col] !== "X") {
        let result = dfs(row, col, maps, isVisited);
        if (result !== 0) answer.push(result);
      }
    }
  }

  answer.sort((a, b) => a - b);
  return answer.length === 0 ? [-1] : answer;
}

function dfs(y, x, maps, isVisited) {
  const vectors = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const stack = [[y, x]];
  isVisited[y][x] = true;
  const N = maps.length;
  const M = maps[0].length;
  let result = Number(maps[y][x]);

  while (stack.length > 0) {
    let [curY, curX] = stack.pop();

    for (let [dy, dx] of vectors) {
      let nextY = curY + dy;
      let nextX = curX + dx;

      if (!(0 <= nextY && nextY < N && 0 <= nextX && nextX < M)) continue;
      if (maps[nextY][nextX] === "X") continue;
      if (isVisited[nextY][nextX]) continue;

      const value = Number(maps[nextY][nextX]);
      stack.push([nextY, nextX]);
      result += value;
      isVisited[nextY][nextX] = true;
    }
  }

  return result;
}
