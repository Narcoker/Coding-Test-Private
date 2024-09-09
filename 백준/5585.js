const fs = require("fs");
const input = fs.readFileSync(
  process.platform === "linux" ? "/dev/stdin" : __dirname + "\\data.txt"
);

let money = 1000 - Number(input);
let answer = 0;

const coins = [500, 100, 50, 10, 5, 1];

for (let coin of coins) {
  answer += Math.floor(money / coin);
  money = money % coin;
}

console.log(answer);
