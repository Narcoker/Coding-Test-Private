const path =
  process.platform === "linux" ? "/dev/stdin" : __dirname + "\\data.txt";
const input = require("fs").readFileSync(path).toString().split("\n");
const [L, C] = input[0].split(" ").map(Number);
const alpha = input[1].split(" ");

function validatePass(pass) {
  const volwels = new Set(["a", "e", "i", "o", "u"]);
  let volwelCount = 0;
  for (let ch of pass) {
    if (volwels.has(ch)) volwelCount++;
  }

  let consonantCount = pass.length - volwelCount;

  return volwelCount >= 1 && consonantCount >= 2;
}

function makePass(pass, visited, alpha, startIndex) {
  if (pass.length === L) {
    if (validatePass(pass)) console.log(pass);
    return;
  }

  for (let i = startIndex; i < alpha.length; i++) {
    if (!visited[i]) {
      visited[i] = true;
      makePass(pass + alpha[i], visited, alpha, i + 1);
      visited[i] = false;
    }
  }
}

function solution(L, C, alpha) {
  alpha.sort();
  const visited = new Array(alpha.length).fill(false);
  makePass("", visited, alpha, 0);
}

solution(L, C, alpha);
