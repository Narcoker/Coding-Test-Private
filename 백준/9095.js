const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split("\n");
let n = input.shift();
let arr = new Array(10).fill(0);
let answer = "";
arr[0] = 1;
arr[1] = 2;
arr[2] = 4;

for (let i = 3; i < arr.length; i++) {
    arr[i] = arr[i - 1] + arr[i - 2] + arr[i - 3];
}

for (let i of input) {
    answer += answer[i + 1] + "\n";
}

console.log(answer);