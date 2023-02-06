const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split("\n");
const [N, K] = input[0].split(" ").map(Number);
let scores = input[1].split(" ").map(Number);

let sortScores = scores.sort((a, b) => b - a);
console.log(sortScores.at(K - 1));