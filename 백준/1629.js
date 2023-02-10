const fs = require('fs');
const [a, b, c] = fs.readFileSync('/dev/stdin').toString().trim().split(' ').map(BigInt);

console.log(pow(b).toString());

function pow(b) {
    if (b === 1n) return a % c;
    let k = pow(b / 2n);

    if (b % 2n === 1n) return (k * k * a) % c;
    else return (k * k) % c;
}