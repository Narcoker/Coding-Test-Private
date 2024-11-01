class Queue {
  constructor() {
    this.items = {};
    this.front = 0;
    this.rear = 0;
  }

  enqueue(item) {
    this.items[this.rear] = item;
    this.rear++;
  }

  dequeue() {
    if (this.size() === 0) {
      console.log("queue is empty");
      return;
    }

    const value = this.items[this.front];
    delete this.items[this.front];
    this.front++;
    return value;
  }

  size() {
    return this.rear - this.front;
  }
}

const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "\\data.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M, V] = input[0].split(" ").map(Number);

const graph = new Array(N + 1);

for (let i = 0; i < graph.length; i++) {
  graph[i] = [];
}

for (let i = 1; i <= M; i++) {
  const [start, end] = input[i].split(" ").map(Number);
  graph[start].push(end);
  graph[end].push(start);
}

for (let i = 0; i < graph.length; i++) {
  graph[i].sort();
}

dfs(graph, V);
bfs(graph, V);

function dfs(graph, start) {
  const answer = [];
  const visited = new Array(graph.length).fill(false);
  const stack = [start];

  while (stack.length) {
    const cur = stack.pop();

    if (!visited[cur]) {
      visited[cur] = true;
      answer.push(cur);

      for (let i = graph[cur].length - 1; i >= 0; i--) {
        const neighbor = graph[cur][i];

        if (!visited[neighbor]) {
          stack.push(neighbor);
        }
      }
    }
  }

  console.log(answer.join(" "));
}

function bfs(graph, start) {
  const answer = [start];
  const visited = new Array(graph.length).fill(false);
  const queue = new Queue();
  queue.enqueue(start);
  visited[start] = true;

  while (queue.size() > 0) {
    const cur = queue.dequeue();

    for (let neighbor of graph[cur]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        queue.enqueue(neighbor);
        answer.push(neighbor);
      }
    }
  }

  console.log(answer.join(" "));
}
