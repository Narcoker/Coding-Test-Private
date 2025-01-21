/*
 인하대학교의 이강호와 서강대학교의 민세희
 이강호-천민호-최백준-김선영-김도현-민세희 

 1과 3, 1과 4, 2와 3, 3과 4, 4와 5가 친구

 1 > 3 4 
 2 > 3
 3 > 4
 4 > 5

 1 > 3 > 2
 1 > 3
 1 > 4
 1 > 4 > 5
*/

const path =
  process.platform === 'linux' ? '/dev/stdin' : __dirname + '\\data.txt';
const input = require('fs').readFileSync(path).toString().split(/\r?\n/);

const [N, M] = input[0].split(' ').map(Number);
const relations = Array.from(new Array(N + 1), () => []);
for (let i = 1; i < M + 1; i++) {
  const [p1, p2] = input[i].split(' ').map(Number);
  if (!relations[p1].includes(p2)) relations[p1].push(p2);
  if (!relations[p2].includes(p1)) relations[p2].push(p1);
}

function solution(N, M, relations) {
  const distances = Array.from(new Array(N + 1), () =>
    new Array(N + 1).fill(Infinity),
  );

  for (let p1 = 1; p1 < N + 1; p1++) {
    for (let p2 of relations[p1]) {
      distances[p1][p2] = 1;
    }
  }

  for (let mid = 1; mid < N + 1; mid++) {
    for (let start = 1; start < N + 1; start++) {
      for (let end = 1; end < N + 1; end++) {
        if (
          distances[start][end] >
          distances[start][mid] + distances[mid][end]
        ) {
          distances[start][end] = distances[start][mid] + distances[mid][end];
        }
      }
    }
  }

  const kabinBacun = [];
  for (let i = 0; i < N + 1; i++) {
    let result = 0;
    for (let index = 1; index < N + 1; index++) {
      if (i !== index) result += distances[i][index];
    }

    kabinBacun.push({ name: i, count: result });
  }

  kabinBacun.sort((a, b) => {
    if (a.count !== b.count) return a.count - b.count;
    else return a.name - b.name;
  });

  console.log(kabinBacun[0].name);
}

solution(N, M, relations);
