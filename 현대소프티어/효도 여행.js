const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];

rl.on('line', line => {
  input.push(line);
}).on('close', () => {
  let answer = 0;
  const [N, M] = input[0].split(' ').map(Number);
  const S = input[1];
  const road = Array.from(new Array(N + 1), () => []);

  // 간선 정보 입력
  for (let i = 2; i < N - 1 + 2; i++) {
    const [u, v, c] = input[i].split(' ');
    road[Number(u)].push([Number(v), c]);
    road[Number(v)].push([Number(u), c]);
  }

  const visited = new Array(N + 1).fill(false);

  // 스택 초기화: (노드 번호, dp 배열) 형태
  const stack = [[1, new Array(S.length + 1).fill(0)]];
  visited[1] = true;

  while (stack.length > 0) {
    const [node, dp] = stack.pop();
    let isLeaf = true;

    for (const [neighbor, ch] of road[node]) {
      if (visited[neighbor]) continue;

      isLeaf = false;
      visited[neighbor] = true;

      // LCS 갱신: dp 배열을 갱신
      const nextDp = [...dp];
      for (let j = 1; j <= S.length; j++) {
        if (S[j - 1] === ch) {
          nextDp[j] = dp[j - 1] + 1;
        } else {
          nextDp[j] = Math.max(nextDp[j - 1], dp[j]);
        }
      }
      stack.push([neighbor, nextDp]);
    }

    // 리프 노드일 경우 최대 LCS 값 갱신
    if (isLeaf) {
      answer = Math.max(answer, dp[dp.length - 1]);
    }
  }

  console.log(answer);
});
