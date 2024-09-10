const fs = require("fs");
const input = fs
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "\\data.txt"
  )
  .toString();

const numbers = input.split(/[+-]/).map(Number);
const opers = input.match(/[+-]/g);

const stack = [numbers[0]];
let isOpen = false;
for (let i = 1; i < numbers.length; i++) {
  if (isOpen && opers[i - 1] === "-") {
    stack.push(")");
    isOpen = false;
  }

  stack.push(opers[i - 1]);

  if (opers[i - 1] === "-") {
    stack.push("(");
    isOpen = true;
  }

  stack.push(numbers[i]);
}

if (isOpen) stack.push(")");

console.log(eval(stack.join("")));
