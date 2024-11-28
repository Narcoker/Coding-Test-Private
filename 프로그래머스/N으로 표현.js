function solution(N, number) {
  const isVisited = new Set(); // 중복 숫자 방지
  const valueByUseCount = Array.from({length: 9}, () => []); // 횟수별 숫자 저장
  valueByUseCount[1].push(N); // N을 한 번 사용한 경우

  if (N === number) return 1; // 숫자 하나만으로 결과가 나오는 경우

  for (let useCount = 2; useCount <= 8; useCount++) {
    // N을 연속으로 이어붙인 숫자 추가 (예: 5 -> 55 -> 555)
    const repeatedValue = Number(N.toString().repeat(useCount));
    if (!isVisited.has(repeatedValue)) {
      valueByUseCount[useCount].push(repeatedValue);
      isVisited.add(repeatedValue);

      if (repeatedValue === number) {
        return useCount;
      }
    }

    // 두 그룹(gred1, gred2)의 연산 조합으로 숫자 생성
    for (let gred1 = 1; gred1 < useCount; gred1++) {
      let gred2 = useCount - gred1;
      for (let value1 of valueByUseCount[gred1]) {
        for (let value2 of valueByUseCount[gred2]) {
          const results = [
            value1 + value2,
            value1 - value2,
            value1 * value2,
            value2 !== 0 ? Math.floor(value1 / value2) : null, // 0으로 나누는 경우 제외
          ];

          for (let result of results) {
            if (result === null || isVisited.has(result)) continue;
            if (result === number) return useCount; // 목표값 도달 시 반환

            valueByUseCount[useCount].push(result);
            isVisited.add(result);
          }
        }
      }
    }
  }
  return -1; // 8회 초과 시 목표값 생성 불가능
}
