function solution(board, skill) {
  let answer = 0;
  const point = Array.from({ length: board.length + 2 }, () =>
    new Array(board[0].length + 2).fill(0),
  );

  for (let [type, r1, c1, r2, c2, degree] of skill) {
    [r1, c1, r2, c2] = [r1 + 1, c1 + 1, r2 + 1, c2 + 1];

    switch (type) {
      case 1: // 공격
        point[r1][c1] -= degree;
        point[r1][c2 + 1] += degree;
        point[r2 + 1][c1] += degree;
        point[r2 + 1][c2 + 1] -= degree;
        break;
      case 2: // 회복
        point[r1][c1] += degree;
        point[r1][c2 + 1] -= degree;
        point[r2 + 1][c1] -= degree;
        point[r2 + 1][c2 + 1] += degree;
        break;
    }
  }

  for (let row = 1; row < point.length; row++) {
    for (let col = 1; col < point[0].length; col++) {
      point[row][col] += point[row][col - 1];
    }
  }

  for (let row = 1; row < point.length; row++) {
    for (let col = 1; col < point[0].length; col++) {
      point[row][col] += point[row - 1][col];
    }
  }

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      if (board[row][col] + point[row + 1][col + 1] > 0) answer++;
    }
  }

  return answer;
}
