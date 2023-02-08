const fs = require("fs");
let input = fs.readFileSync('/dev/stdin').toString().trim().split("\n").map(Number);

let T = input.shift();
let answer = [];

for (let i = 0; i < T; i++) {
    let k = input.shift();
    let n = input.shift();
    let arr = Array.from(Array(k + 1), () => new Array(14).fill(1));
    arr[0] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    for (let floor = 1; floor <= k; floor++) {
        for (let room = 1; room < arr[0].length; room++) {
            arr[floor][room] = arr[floor][room - 1] + arr[floor - 1][room];
        }
    }
    answer.push(arr[k][n - 1]);
}

console.log(answer.join("\n"))