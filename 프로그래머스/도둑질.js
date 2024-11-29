function solution(money) {
  const selectFirst = money.slice(0, -1);
  const selectSecond = money.slice(1, money.length);

  const dp1 = new Array(selectFirst.length).fill(0);
  const dp2 = new Array(selectSecond.length).fill(0);
  dp1[0] = selectFirst[0];
  dp1[1] = Math.max(selectFirst[0], selectFirst[1]);
  dp2[0] = selectSecond[0];
  dp2[1] = Math.max(selectSecond[0], selectSecond[1]);

  for (let i = 2; i < dp1.length; i++) {
    dp1[i] = Math.max(dp1[i - 2] + selectFirst[i], dp1[i - 1]);
    dp2[i] = Math.max(dp2[i - 2] + selectSecond[i], dp2[i - 1]);
  }

  return Math.max(dp1[dp1.length - 1], dp2[dp2.length - 1]);
}
