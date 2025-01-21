const path =
  process.platform === 'linux' ? '/dev/stdin' : __dirname + '\\data.txt';
const numbers = require('fs')
  .readFileSync(path)
  .toString()
  .split(/\r?\n/)
  .map(Number);

function solution(numbers) {
  const primeNumbers = [];
  const isPrimeNumber = new Array(1_000_000 + 1).fill(true);
  isPrimeNumber[0] = isPrimeNumber[1] = false; // 0과 1은 소수가 아니므로 false 처리

  // 에라토스테네스의 체
  for (let number = 2; number < Math.sqrt(1_000_000); number++) {
    if (isPrimeNumber[number]) {
      primeNumbers.push(number);
      for (
        let removeNumber = number * 2;
        removeNumber < isPrimeNumber.length;
        removeNumber += number
      ) {
        isPrimeNumber[removeNumber] = false;
      }
    }
  }

  let answer = [];
  for (let i = 0; i < numbers.length; i++) {
    let caseNumber = numbers[i];
    if (caseNumber === 0) break;

    let pass = false;
    for (let n1 of primeNumbers) {
      let n2 = caseNumber - n1;
      if (isPrimeNumber[n1] && isPrimeNumber[n2]) {
        answer.push(`${caseNumber} = ${n1} + ${n2}`);
        pass = true;
        break;
      }
    }

    if (!pass) answer.push("Goldbach's conjecture is wrong.");
  }

  console.log(answer.join('\n'));
}

solution(numbers);
