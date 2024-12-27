const path =
  process.platform === "linux" ? "/dev/stdin" : __dirname + "\\data.txt";
const input = require("fs").readFileSync(path).toString().split(/\r?\n/);

let lineIdx = 0;
let N = Number(input[lineIdx++]);
const tree = Array.from(new Array(N + 1), () => []);
for (let i = 0; i < N - 1; i++) {
  const [p1, p2] = input[lineIdx++].split(" ").map(Number);
  tree[p1].push(p2);
  tree[p2].push(p1);
}

function solution(N, tree) {
  const dp = Array.from(new Array(N + 1), () => new Array(2).fill(0));
  const visited = new Array(N + 1).fill(false);

  dfs(1, visited, dp, tree);
  console.log(Math.min(dp[1][0], dp[1][1]));
}

function dfs(cur, visited, dp, tree) {
  visited[cur] = true;
  dp[cur][0] = 0; // 0: 본인이 얼라이답터가 아닌 경우, 이웃은 모두 얼라이답터여야한다.
  dp[cur][1] = 1; // 1: 본인이 얼라이답터인 경우, 이웃은 얼라이답터이거나 아니여도 된다.

  for (let neighbor of tree[cur]) {
    if (!visited[neighbor]) {
      dfs(neighbor, visited, dp, tree); // 자식 노드의 노드 dp 값을 미리 구한다.
      dp[cur][0] += dp[neighbor][1];
      dp[cur][1] += Math.min(dp[neighbor][0], dp[neighbor][1]); // 둘 중에 최소값을 더한다.
    }
  }
}

solution(N, tree);
