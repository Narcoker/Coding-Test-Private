function solution(video_len, pos, op_start, op_end, commands) {
  for (const op of commands) {
    pos = use(op, pos, video_len, op_start, op_end);
  }

  return pos;
}

function timeToSec(time) {
  // string
  const [min, sec] = time.split(':').map(Number);
  return min * 60 + sec;
}

function secToTime(time) {
  // number
  const [min, sec] = [Math.floor(time / 60), time % 60];
  return `${min.toString().padStart(2, '0')}:${sec
    .toString()
    .padStart(2, '0')}`;
}

function use(op, curTime, video_len, op_start, op_end) {
  let curSec = timeToSec(curTime);

  if (timeToSec(op_start) <= curSec && curSec <= timeToSec(op_end)) {
    curSec = timeToSec(op_end);
  }

  switch (op) {
    case 'prev':
      curSec = curSec - 10 >= 0 ? curSec - 10 : 0;
      break;
    case 'next':
      curSec =
        curSec + 10 <= timeToSec(video_len)
          ? curSec + 10
          : timeToSec(video_len);
      break;
  }

  if (timeToSec(op_start) <= curSec && curSec <= timeToSec(op_end)) {
    curSec = timeToSec(op_end);
  }

  return secToTime(curSec);
}
