const path =
  process.platform === "linux" ? "/dev/stdin" : __dirname + "\\data.txt";
const input = require("fs").readFileSync(path).toString().trim().split(/\r?\n/);

const [S, T] = [...input];
let answer = 0;

function dfs(cur) {
  if (cur === S) {
    answer = 1;
    return;
  }

  if (cur.length === 0) {
    return;
  }

  if (cur.at(-1) === "A") {
    let nextvalue = cur
      .split("")
      .slice(0, cur.length - 1)
      .join("");
    dfs(nextvalue);
  }
  if (cur[0] === "B") {
    let nextvalue = cur.split("").slice(1, cur.length).reverse().join("");
    dfs(nextvalue);
  }
}

function solution(S, T) {
  dfs(T);
}

solution(S, T);
console.log(answer);
