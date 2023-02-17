// const fs = require('fs');
// let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
// let N = input.shift() * 1;
// input = input.shift().split(' ').map(Number);

// let dpList = Array.from(new Array(N), (_, i) => [input[i]])

// for (let targetIndex = 0; targetIndex < N; targetIndex++) {
//     for (let index = 0; index <= targetIndex; index++) {
//         if (input[targetIndex] > input[index] && dpList[index].length >= dpList[targetIndex].length) {
//             dpList[targetIndex] = [...dpList[index], input[targetIndex]];
//         }
//     }
// }

// dpList = dpList.sort((a, b) => a.length - b.length);
// console.log(dpList[N - 1].length);
// console.log(dpList[N - 1].join(" "));

//다른 사람의 풀이
const fs = require("fs");
const input = fs.readFileSync(__dirname + "/data.txt").toString().split("\n");

const n = Number(input[0]);
const arr = input[1].split(" ").map(Number);
let dp = new Array(n).fill(1);

// 길이 구하기
for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
        if (arr[i] > arr[j]) {
            dp[i] = Math.max(dp[i], dp[j] + 1);
        }
    }
}
console.log(Math.max(...dp));

// 부분 수열 구하기
// [ 1, 2, 1, 3, 2, 4 ]
// 위 값은 각 수의 높은 수의 정도를 나타낸 값이다.
// 이 값을 활용해서 역순서대로 넣는다.
// 
// 4,3,2,1 
let order = 1;
let result = [];
for (let i = 0; i < n; i++) {
    if (dp[i] == order) {
        result.push(arr[i]);
        order++;
    }
}
console.log(dp)
console.log(...result);