const fs = require('fs');
let input = fs.readFileSync(__dirname + "/data.txt").toString().trim().split('\r\n').map((data) => data.split(" ").map(Number));
let [person, link] = input.shift();
const friends = Array.from(Array(person), () => []);
let answer = 0;

for (let [person1, person2] of input) {
    friends[person1].push(person2);
    friends[person2].push(person1);
}

const isVisited = Array(person).fill(false);
for (let i = 0; i < person; i++) {
    if (answer != 0) break;
    dfs(i, 1);
}

console.log(answer);

function dfs(start, count) {
    isVisited[start] = true;
    if (answer === 1) {
        return;
    }
    if (count === 5) {
        answer = 1;
        return;
    }
    friends[start].forEach(v => {
        if (!isVisited[v]) {
            dfs(v, count + 1);
        }
    })
    isVisited[start] = false;
}