const fs = require('fs');
const N = fs.readFileSync('/dev/stdin').toString().trim() * 1;
let count = [BigInt(0), BigInt(1)];
for (let i = 2; i <= N; i++) {
    count = [count[0] + count[1], count[0]];
}

console.log((count[0] + count[1]).toString());