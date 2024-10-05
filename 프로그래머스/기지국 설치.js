function solution(n, stations, w) {
  var answer = 0;
  let start = stations[0] - w <= 1 ? stations[0] + w + 1 : 1;
  for (let i = 0; i < stations.length; i++) {
    if (stations[i] - w <= start) {
      start = stations[i] + w + 1;
      continue;
    }

    let end = stations[i] - w - 1;
    let area = end - start + 1;

    let amount = Math.ceil(area / (w * 2 + 1));
    answer += amount;
    start = stations[i] + w + 1;
  }

  if (start <= n) {
    let area = n - start + 1;
    let amount = Math.ceil(area / (w * 2 + 1));
    answer += amount;
  }

  return answer;
}
