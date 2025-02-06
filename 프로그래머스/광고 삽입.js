function solution(play_time, adv_time, logs) {
  const videoTime = new Array(360000).fill(0);
  const playTimeSec = timeToSec(play_time);
  const advTimeSec = timeToSec(adv_time);

  // 시작 시간, 종료 시간 출입 기록
  for (let i = 0; i < logs.length; i++) {
    const [start, end] = duringToSec(logs[i]);
    videoTime[start] += 1;
    videoTime[end] -= 1;
  }

  // i~i+1초 까지 해당 구간에 몇명봤는데
  for (let i = 1; i < playTimeSec; i++) {
    videoTime[i] += videoTime[i - 1];
  }

  // 0~i초 까지 누적 시청자 수 구하기
  for (let i = 1; i < playTimeSec; i++) {
    videoTime[i] += videoTime[i - 1];
  }

  let maxTime = 0;
  let answer = 0;
  // 광고 시작 가능 시점 순회
  for (let advStart = 0; advStart <= playTimeSec - advTimeSec; advStart++) {
    let advEnd = advStart + advTimeSec;
    let sum = videoTime[advEnd - 1]; // 0 ~ 광고끝나는시간

    if (advStart > 0)
      // 처음부터 시작이 아닌 경우
      sum -= videoTime[advStart - 1]; // 누적합 공식

    if (maxTime < sum) {
      answer = advStart;
      maxTime = sum;
    }
  }

  return secToTime(answer);
}

function duringToSec(str) {
  let [start, end] = str.split('-');
  return [timeToSec(start), timeToSec(end)];
}

function timeToSec(str) {
  let [hour, min, sec] = str.split(':').map(Number);
  return hour * 3600 + min * 60 + sec;
}

function secToTime(num) {
  const hour = Math.floor(num / 3600)
    .toString()
    .padStart(2, '0');
  const min = Math.floor((num % 3600) / 60)
    .toString()
    .padStart(2, '0');
  const sec = (num % 60).toString().padStart(2, '0');
  return `${hour}:${min}:${sec}`;
}
