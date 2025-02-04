const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];

rl.on('line', line => {
  input.push(line);
}).on('close', () => {
  let lineIdx = 0;
  const [N, M] = input[lineIdx++].split(' ').map(Number);
  const room = {};
  for (let i = 0; i < N; i++) {
    const roomName = input[lineIdx++];
    room[roomName] = [[9, 9]];
  }

  for (let i = 0; i < M; i++) {
    const [roomName, start, end] = input[lineIdx++].split(' ');
    room[roomName].push([Number(start), Number(end)]);
  }

  const roomNames = Object.keys(room).sort();
  for (let roomName of roomNames) {
    room[roomName].sort((a, b) => a[0] - b[0]);
    room[roomName].push([18, 18]);

    const canBookTime = [];
    for (let i = 1; i < room[roomName].length - 1; i++) {
      let [prevStart, prevEnd] = room[roomName][i - 1];
      let [start, end] = room[roomName][i];
      const term = start - prevEnd;

      if (term === 0) continue;
      else {
        canBookTime.push([prevEnd, prevEnd + term]);
      }
    }

    let [lastStart, lastEnd] = room[roomName][room[roomName].length - 2];
    let [closeStart, closeEnd] = room[roomName][room[roomName].length - 1];
    let term = closeStart - lastEnd;
    if (term !== 0) canBookTime.push([lastEnd, lastEnd + term]);

    console.log(`Room ${roomName}:`);

    if (canBookTime.length > 0) {
      console.log(`${canBookTime.length} available:`);

      for (let [start, end] of canBookTime) {
        console.log(
          `${start.toString().padStart(2, '0')}-${end
            .toString()
            .padStart(2, '0')}`,
        );
      }
    } else {
      console.log('Not available');
    }
    if (roomName !== roomNames[roomNames.length - 1]) console.log('-----');
  }
});
