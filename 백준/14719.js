const path =
  process.platform === 'linux' ? '/dev/stdin' : __dirname + '\\data.txt';
const input = require('fs').readFileSync(path).toString().split(/\r?\n/);

const [H, W] = input[0].split(' ').map(Number);
const heights = input[1].split(' ').map(Number);

function solution(H, W, heights) {
  let answer = 0;
  let prevMaxHeights = [];
  let prevMaxHeight = 0;
  for (let i = 0; i < W; i++) {
    if (i === 0 || i === W - 1) {
      prevMaxHeights[i] = heights[i];
      prevMaxHeight = heights[i];
    } else {
      if (prevMaxHeight <= heights[i]) {
        prevMaxHeight = heights[i];
        prevMaxHeights[i] = heights[i];
      } else {
        prevMaxHeights[i] = prevMaxHeight;
      }
    }
  }

  let postMaxHeights = [];
  let postMaxHeight = 0;
  for (let i = W - 1; i >= 0; i--) {
    if (i === 0 || i === W - 1) {
      postMaxHeights[i] = heights[i];
      postMaxHeight = heights[i];
    } else {
      if (postMaxHeight <= heights[i]) {
        postMaxHeight = heights[i];
        postMaxHeights[i] = heights[i];
      } else {
        postMaxHeights[i] = postMaxHeight;
      }
    }
  }

  for (let i = 0; i < W; i++) {
    answer += Math.min(prevMaxHeights[i], postMaxHeights[i]) - heights[i];
  }
  console.log(answer);
}

solution(H, W, heights);
