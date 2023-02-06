const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n").map(Number);
let sorted = input.sort((a, b) => a - b);
let avg = input.reduce((acc, value) => {
    return acc + value;
}) / 5;
console.log(avg);
console.log(input[2]);