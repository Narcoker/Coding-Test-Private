// function quickSort(arr, L, R) {
//     let [left, right] = [L, R];
//     let pivot = Math.floor((left + right) / 2);
//     while (left < right) {
//         while (arr[left] < arr[pivot])
//             left++;

//         while (arr[pivot] < arr[right])
//             right--;

//         let temp = arr[left];
//         arr[left] = arr[right];
//         arr[right] = temp;

//         left++;
//         right--;
//     }

//     if (L < right) quickSort(arr, L, right);
//     if (left < R) quickSort(arr, left, R);
// }

// const fs = require('fs');
// let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(Number);
// const N = input[0];
// const arr = input.slice(1);
// quickSort(arr, 0, arr.length - 1);
// console.log(arr.join("\n"));


const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(Number);
const N = input.shift();
const sorted = input.sort((a, b) => a - b);
console.log(sorted.join('\n'));