// Max heap

class Heap {
  constructor() {
    this.heap = [null];
  }

  size() {
    return this.heap.length - 1;
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  push(value) {
    this.heap.push(value);
    let curIdx = this.heap.length - 1;
    let parIdx = (curIdx / 2) >> 0;

    while (curIdx > 1 && this.heap[curIdx] > this.heap[parIdx]) {
      this.swap(curIdx, parIdx);
      curIdx = parIdx;
      parIdx = (curIdx / 2) >> 0;
    }
  }

  pop() {
    const max = this.heap[1];

    if (this.size() <= 1) {
      this.heap = [null];
    } else this.heap[1] = this.heap.pop(); // this pop method is Array.Prototype.pop()

    let cur_Idx = 1;
    let left_Idx = cur_Idx * 2;
    let right_Idx = left_Idx + 1;

    if (!this.heap[left_Idx]) return max;

    if (!this.heap[right_Idx]) {
      if (this.heap[left_Idx] > this.heap[cur_Idx])
        this.swap(left_Idx, cur_Idx);
      return max;
    }

    while (
      (left_Idx < this.heap.length &&
        this.heap[cur_Idx] < this.heap[left_Idx]) ||
      (right_Idx < this.heap.length &&
        this.heap[cur_Idx] < this.heap[right_Idx])
    ) {
      const maxIdx =
        this.heap[left_Idx] > this.heap[right_Idx] ? left_Idx : right_Idx;

      this.swap(cur_Idx, maxIdx);
      cur_Idx = maxIdx;
      left_Idx = cur_Idx * 2;
      right_Idx = left_Idx + 1;
    }

    return max;
  }
}

function solution(n, k, enemy) {
    var answer = 0;
    const heap = new Heap();

    for(let i = 0; i < enemy.length; i++){
        n -= enemy[i];
        heap.push(enemy[i]);

        if(n < 0){
            if(k > 0){
                n += heap.pop() ?? 0;
                k--;
            }else break;
        }

        answer++;
    }
    return answer;
}