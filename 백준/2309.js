const path =
  process.platfrom === "linux" ? "/dev/stdin" : __dirname + "\\data.txt";
const input = require("fs").readFileSync(path).toString().split(/\r?\n/);

const arr = [];
for (let i = 0; i < 9; i++) {
  arr.push(Number(input[i]));
}

function solution(arr) {
  for (let i = 0; i < 8; i++) {
    for (let k = i + 1; k < 9; k++) {
      let sum = arr.reduce((acc, value, index) => {
        if (index !== i && index !== k) return acc + value;
        else return acc;
      }, 0);

      if (sum === 100) {
        result_arr = arr
          .filter((v, index) => index !== i && index !== k)
          .sort((a, b) => a - b);

        console.log(result_arr.join("\n"));
        return;
      }
    }
  }
}

solution(arr);
