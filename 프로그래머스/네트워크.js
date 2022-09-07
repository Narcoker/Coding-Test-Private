let answer = 0;
let visited;

function dfs(computers, i) {
    visited[i] = true;
    for (let link = 0; link < computers[i].length; link++) {
        if (computers[i][link] && visited[link] === false) {
            dfs(computers, link);
        }
    }

}

function solution(n, computers) {
    visited = new Array(n).fill(false);
    for (let i = 0; i < n; i++) {
        if (visited[i] === false) {
            dfs(computers, i);
            answer++;
        }
    }
    return answer;
}
console.log(solution(3, [[1, 1, 0], [1, 1, 1], [0, 1, 1]]));