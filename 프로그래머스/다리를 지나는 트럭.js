class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.during_bridge = 0;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
    this.sum_weights = 0;
  }

  enqueue(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.size++;
    this.sum_weights += data;
  }

  dequeue() {
    if (this.size === 0) throw new Error("Queue is empty");

    let removeNode = this.head;
    const data = removeNode.data;
    this.head = this.head.next;
    removeNode = null;

    this.size--;
    this.sum_weights -= data;
    return data;
  }

  toString() {
    const result = [];
    let cur = this.head;
    while (cur) {
      result.push(cur.data);
      cur = cur.next;
    }
    return result;
  }

  count_time() {
    let cur = this.head;
    while (cur) {
      cur.during_bridge++;
      cur = cur.next;
    }
  }

  get_remain_tail(max_length) {
    let count = 0;
    let cur = this.head;

    while (cur) {
      count += cur.during_bridge;
      cur = cur.next;
    }

    if (count < max_length) return max_length - count;
    if (count >= max_length) return 0;
  }
}

function solution(bridge_length, weight, truck_weights) {
  var answer = 0;

  const bridge = new Queue();
  const ready_trucks = new Queue();
  const end_trucks = new Queue();

  for (let truck_weight of truck_weights) {
    ready_trucks.enqueue(truck_weight);
  }

  while (end_trucks.size < truck_weights.length) {
    answer++;

    if (bridge.size > 0) {
      if (bridge.head.during_bridge === bridge_length) {
        end_trucks.enqueue(bridge.dequeue());
      }
    }

    if (
      ready_trucks.size > 0 &&
      bridge.sum_weights + ready_trucks.head.data <= weight &&
      bridge.size <= bridge_length
    ) {
      bridge.enqueue(ready_trucks.dequeue());
    }

    bridge.count_time();
  }

  return answer;
}

console.log(solution(100, 100, [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]));
