const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];

rl.on("line", (line) => {
  lines.push(line);
}).on("close", () => {
  let lineIdx = 0;
  const [n, m] = lines[lineIdx++].split(" ").map(Number);
  const board = Array.from({length: n + 1}, () => []);
  const reverseBoard = Array.from({length: n + 1}, () => []);

  // 그래프 초기화
  for (let i = 0; i < m; i++) {
    const [v1, v2] = lines[lineIdx++].split(" ").map(Number);
    board[v1].push(v2); // 정방향 간선
    reverseBoard[v2].push(v1); // 역방향 간선
  }

  const [S, T] = lines[lineIdx++].split(" ").map(Number);

  // 출근길: S에서 시작해서 도달할 수 있는 정점들

  const startToEndVisited = new Array(board.length + 1).fill(false);
  startToEndVisited[T] = true;
  dfs(S, T, board, startToEndVisited);

  // 퇴근길: T에서 시작해서 도달할 수 있는 정점들 (역방향 그래프 사용)
  const endToStartVisited = new Array(board.length + 1).fill(false);
  endToStartVisited[S] = true;
  dfs(T, S, board, endToStartVisited);

  const startToEndVisited_reverse = new Array(board.length + 1).fill(false);
  dfs(S, T, reverseBoard, startToEndVisited_reverse);
  const EndToStartVisited_reverse = new Array(board.length + 1).fill(false);
  dfs(T, S, reverseBoard, EndToStartVisited_reverse);

  // 출근과 퇴근길 모두 방문 가능한 정점 수 계산
  let answer = 0;
  for (let i = 1; i <= n; i++) {
    if (
      startToEndVisited[i] &&
      endToStartVisited[i] &&
      startToEndVisited_reverse[i] &&
      EndToStartVisited_reverse[i]
    ) {
      answer++;
    }
  }

  console.log(answer - 2);
});

// DFS 함수
function dfs(start, end, board, visited) {
  const stack = [start];
  visited[start] = true;

  while (stack.length > 0) {
    const cur = stack.pop();

    for (const neighbor of board[cur]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        stack.push(neighbor);
      }
    }
  }
}
