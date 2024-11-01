const fs = require("fs");
const input = fs
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "\\data.txt"
  )
  .toString();

let N = Number(input);

let numbers = N.toString().split("").map(Number);
numbers.sort((a, b) => b - a);

console.log(numbers);

if (!numbers.includes(0)) {
  console.log(-1);
} else {
  let sum = 0;
  let max_count = numbers.length >= 3 ? 3 : numbers.length;
  for (let i = 0; i < max_count; i++) {
    sum += numbers[numbers.length - 1 - i];
  }

  console.log(sum);
}
