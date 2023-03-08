const fs = require('fs');
let input = fs.readFileSync(__dirname + "/data.txt").toString().trim().split('\r\n').map((v) => v.split(' ').map(Number));
let [N, M] = input.shift();
let graph = Array.from(Array(N + 1), () => []);
let isVisited = Array(N + 1).fill(false);
let answer = 0;

for (let [to, from] of input) {
    graph[to].push(from);
    graph[from].push(to);
}

for (let i = 1; i < N + 1; i++) {
    if (!isVisited[i]) {
        answer++;
        dfs(i);
    }
}

console.log(answer);

function dfs(from) {
    isVisited[from] = true;
    for (let to of graph[from]) {
        if (!isVisited[to]) {
            dfs(to);
        }
    }
}