class Heap {
  constructor() {
    this.data = [null]; // 1번 인덱스부터 사용하기 위해 null 추가
  }

  size() {
    return this.data.length - 1;
  }

  swap(a, b) {
    [this.data[a], this.data[b]] = [this.data[b], this.data[a]];
  }

  push(value) {
    this.data.push(value);

    let curIdx = this.data.length - 1;
    let parIdx = Math.floor(curIdx / 2);

    // 부모 노드가 자식 노드보다 작으면 교환(Max Heap)
    while (curIdx > 1 && this.data[curIdx][0] > this.data[parIdx][0]) {
      this.swap(curIdx, parIdx);

      curIdx = parIdx;
      parIdx = Math.floor(curIdx / 2);
    }
  }

  pop() {
    if (this.size() < 1) throw new Error("heap is empty"); // 빈 힙 처리

    const maxValue = this.data[1]; // 루트 노드 값 저장

    if (this.size() === 1) {
      this.data = [null]; // 힙에 하나만 남아 있는 경우 초기화
    } else {
      this.data[1] = this.data.pop(); // 마지막 노드를 루트로 이동
    }

    let curIdx = 1;
    let leftIdx = curIdx * 2;
    let rightIdx = curIdx * 2 + 1;

    // 자식이 있을 때까지 반복
    while (leftIdx <= this.size()) {
      let largerIdx = leftIdx;

      // 오른쪽 자식이 있고 더 큰 경우
      if (
        rightIdx <= this.size() &&
        this.data[rightIdx][0] > this.data[leftIdx][0]
      ) {
        largerIdx = rightIdx;
      }

      // 부모가 자식보다 크면 종료
      if (this.data[curIdx][0] >= this.data[largerIdx][0]) break;

      // 교환 후 인덱스 갱신
      this.swap(curIdx, largerIdx);
      curIdx = largerIdx;
      leftIdx = curIdx * 2;
      rightIdx = curIdx * 2 + 1;
    }

    return maxValue;
  }
}

const path =
  process.platform === "linux" ? "/dev/stdin" : __dirname + "\\data.txt";
const input = require("fs").readFileSync(path).toString().split("\n");

const T = Number(input[0]);

for (let t = 0; t < T; t++) {
  const [start, end] = input[t + 1].split(" ").map(Number);
  solution(start, end);
}

function solution(start, end) {
  const heap = new Heap();
  heap.push([start, 0, 0]); // 현재위치, 이전속도, 횟수;

  while (heap.size() > 0) {
    const [curPos, speed, count] = heap.pop();
    console.log(`debug: curPos: ${curPos}, speed: ${speed}, count: ${count}`);

    for (let acc = -1; acc <= 1; acc++) {
      let nextSpeed = speed + acc;
      let nextPos = curPos + nextSpeed;

      if (nextSpeed < 0) continue;
      if (nextPos > end) continue;
      if (nextPos < curPos) continue;

      if (nextPos === end && nextSpeed === 1) {
        console.log(count + 1);
        return;
      }
      heap.push([nextPos, nextSpeed, count + 1]);
    }
  }
}
