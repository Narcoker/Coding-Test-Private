function manachers(S) {
  // 문자열 S를 변환하여 특수 문자 추가 ("abc" -> "#a#b#c#")
  const T = "#" + S.split("").join("#") + "#";
  const N = T.length;
  const A = new Array(N).fill(0); // i 번째 문자를 중심으로하는 가장 긴 회문의 반지름 크기
  let r = 0,
    p = 0;
  // r : 회문의 범위중 가장 큰 인덱스
  // p : 회문의 중심 인덱스

  // Manacher's Algorithm을 사용하여 A 배열을 채운다
  // i : p를 중심으로 한 두 대칭점 중 왼쪽 점
  for (let i = 0; i < N; i++) {
    if (i <= r) {
      // i를 기준으로 반지름이 A[2p - i]인 문자열이 p가 중점인 회문에 속해 대칭성 만족
      A[i] = Math.min(A[2 * p - i], r - i);
    }
    while (
      i - A[i] - 1 >= 0 &&
      i + A[i] + 1 < N &&
      T[i - A[i] - 1] === T[i + A[i] + 1]
    ) {
      // A[i]의 초기값에서 T[i - A[i] - 1] === T[i + A[i] + 1] 이면 대칭성 만족하므로 A[i] 증가
      A[i]++;
    }
    if (i + A[i] > r) {
      // 원래 회문의 범위 중 가장 큰 인덱스 보다 새로 만든 회문의 가장 큰 인덱스가 더 큰 경우 재할당
      r = i + A[i]; // 회문의 범위중 가장 큰 인덱스 재할당
      p = i; // 회문 중심 인덱스 재할당
    }
  }

  // A 배열에서 가장 큰 값을 찾고 실제 문자열 길이로 변환하여 반환
  return Math.max(...A);
}

function solution(s) {
  // Manacher's Algorithm을 사용하여 최장 팰린드롬 부분 문자열의 길이를 반환
  return manachers(s);
}
