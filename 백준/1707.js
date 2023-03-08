const fs = require('fs');
let input = fs.readFileSync("/dev/stdin").toString().trim().split('\n');
let testCase = input.shift() * 1;
let answer = "";

for (let test = 0; test < testCase; test++) {
    let [V, E] = input.shift().split(' ').map(Number);
    let graphInput = input.splice(0, E).map((data) => data.split(' ').map(Number));
    let graph = Array.from(Array(V + 1), () => []);
    let color = Array(V + 1).fill(null);
    let flag = "YES";
    for (let [to, from] of graphInput) {
        graph[to].push(from);
        graph[from].push(to);
    }

    for (let from = 1; from < V + 1; from++) {
        if (flag === "NO") {
            break;
        }

        if (color[from] === null) {
            dfs(from, 1, color);
        }
    }

    answer += `${flag}\n`;

    function dfs(from, colorType) {
        color[from] = colorType;
        for (let to of graph[from]) {
            if (color[to] === colorType) {
                flag = "NO"
                return;
            }
            if (!color[to]) {
                dfs(to, -colorType);
            }
        }
    }
}

console.log(answer);