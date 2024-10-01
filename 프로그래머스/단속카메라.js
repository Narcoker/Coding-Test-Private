function solution(routes) {
  var answer = 1;
  routes.sort((a, b) => a[1] - b[1]);
  let spot = routes[0][1];

  for (let i = 1; i < routes.length; i++) {
    let [start, end] = routes[i];
    if (spot < start) {
      spot = end;
      answer++;
    }
  }
  return answer;
}
