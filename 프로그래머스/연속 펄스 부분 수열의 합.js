function solution(sequence) {
  var answer = 0;
  const startPlusDP = [];
  const startMinusDP = [];

  for (let i = 0; i < sequence.length; i++) {
    if (i === 0) {
      startPlusDP.push(sequence[i]);
      startMinusDP.push(-sequence[i]);
    } else if (i % 2 === 1) {
      startPlusDP.push(
        Math.max(startPlusDP[i - 1] - sequence[i], -sequence[i])
      );
      startMinusDP.push(
        Math.max(startMinusDP[i - 1] + sequence[i], sequence[i])
      );
    } else {
      startPlusDP.push(Math.max(startPlusDP[i - 1] + sequence[i], sequence[i]));
      startMinusDP.push(
        Math.max(startMinusDP[i - 1] - sequence[i], -sequence[i])
      );
    }

    answer = Math.max(answer, startPlusDP[i], startMinusDP[i]);
  }

  return answer;
}
