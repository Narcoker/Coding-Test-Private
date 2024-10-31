/*
[암호판 생성]
키를 사용해서 이전에 안나왔던것만 먼저 넣고
이후에 안사용된거 순서대로 넣기 


[두글자 단위로 분리]
I와 J를 동일 시 하며 J는 입력으로 안준다.

같은 두 글자로 쌍이 생기면 가장 앞에 있는 상 사이에 X를 넣고 뒤쪽은 새롭게 쌍을 구성
쌍이 XX였다면 Q를 넣는다.
마지막에 한글자가 남는다면 X를 강제로 덧붙여 강제로 쌍을 맞춰준다.
마지막 남은 한글자가 X인 경우에는 예외적으로 XX로 쌍을 맞춘다.

[쌍을 암호화]
두 글자 모두 표에서 같은행에 존재하면:
오른쪽으로 한칸 이동한 칸에 적인 글자로 암호화
글자가 표 맨마지막 열에 있는 경우 0번열 사용

두 글자 모두 같은 열에 존재하면:
아래로 한칸 이동한 칸에 적힌 글자로 암호화
글자가 표 맨 마지막 행에 있는 경우 0번 행 사용

두 글자가 모두 서로 다른행, 열에 존재하면:
두 글자가 위치하는 칸의 열이 서로 교환

0,2, 4,3
0,3, 4,2
*/

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];

rl.on("line", (line) => {
  lines.push(line);
}).on("close", () => {
  const message = lines[0];
  const key = lines[1];

  const board = makeBoard(key);
  const table = makeTable(board);
  const twoSplitMessage = getTwoSplitMessage(message);
  const result = makeCiper(twoSplitMessage, board, table);
  console.log(result);
});

function makeBoard(key) {
  const result = {};
  let [row, col] = [0, 0];
  const visited = new Set();

  for (let ch of key) {
    if (!visited.has(ch)) {
      result[ch] = [row % 5, col % 5];
      col++;
      if (col === 5) {
        row++;
        col = 0;
      }
      visited.add(ch);
    }
  }

  const alpha = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  for (let al of alpha) {
    if (!visited.has(al)) {
      result[al] = [row % 5, col % 5];
      col++;
      if (col === 5) {
        row++;
        col = 0;
      }
      visited.add(al);
    }
  }
  return result;
}

function makeTable(board) {
  const alpha = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  const result = Array.from(new Array(5), () => new Array(5).fill(""));

  for (let al of alpha) {
    let [row, col] = board[al];
    result[row][col] = al;
  }

  return result;
}

function getTwoSplitMessage(message) {
  const result = [];
  let temp = "";
  for (let m of message) {
    if (temp.length === 0) {
      temp += m;
      continue;
    }

    if (temp[0] === m) {
      if (m === "X") temp += "Q";
      else temp += "X";

      result.push(temp);
      temp = "";
      temp += m;
    } else {
      temp += m;
      result.push(temp);
      temp = "";
    }
  }

  if (temp.length === 1) {
    temp += "X";
    result.push(temp);
  }

  return result;
}

function makeCiper(splitMessage, board, table) {
  let result = "";
  for (let sm of splitMessage) {
    const [A, B] = [sm[0], sm[1]];
    let ciperA = "";
    let ciperB = "";
    if (isSameRow(A, B, board)) {
      ciperA = table[board[A][0]][(board[A][1] + 1) % 5];
      ciperB = table[board[B][0]][(board[B][1] + 1) % 5];
    } else if (isSameCol(A, B, board)) {
      ciperA = table[(board[A][0] + 1) % 5][board[A][1]];
      ciperB = table[(board[B][0] + 1) % 5][board[B][1]];
    } else {
      ciperA = table[board[A][0]][board[B][1]];
      ciperB = table[board[B][0]][board[A][1]];
    }

    result += ciperA + ciperB;
  }

  return result;
}

function isSameRow(A, B, board) {
  return board[A][0] === board[B][0];
}

function isSameCol(A, B, board) {
  return board[A][1] === board[B][1];
}
