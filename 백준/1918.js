const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim();

const stack = [];
const priority = {
    "*": 3,
    "/": 3,
    "+": 2,
    "-": 2,
    "(": 1,
    ")": 1,

}

let answer = ""

for (let ch of input) {
    switch (ch) {
        case "*":
        case "/":
        case "+":
        case "-":
            while (stack.length !== 0 && priority[stack.at(-1)] >= priority[ch]) {
                answer += stack.pop();
            }
            stack.push(ch);
            break;
        case "(":
            stack.push(ch);
            break;
        case ")":
            while (stack.at(-1) !== "(") {
                answer += stack.pop();
            }
            stack.pop();
            break;
        default:
            answer += ch;
    }
}

while (stack.length !== 0) {
    answer += stack.pop();
}

console.log(answer);