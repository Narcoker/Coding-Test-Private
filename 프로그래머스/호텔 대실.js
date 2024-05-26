function time_to_min(time) {
  let result = 0;
  let [hour, min] = time.split(":").map(Number);
  result += hour * 60 + min;
  return result;
}

function solution(book_time) {
  var answer = 0;
  const arr = [];

  for (let [start, end] of book_time) {
    arr.push([time_to_min(start), time_to_min(end)]);
  }
  arr.sort((a, b) => a[0] - b[0]);

  const rooms = []; // 끝나는 시간 기준으로 정렬
  for (let [start, end] of arr) {
    if (rooms.length === 0) {
      rooms.push([start, end]);
      console.log(rooms);
      continue;
    }

    let is_select = false;
    for (let i = 0; i < rooms.length; i++) {
      let [room_start, room_end] = rooms[i];

      if (start >= room_end + 10) {
        rooms[i] = [start, end];
        is_select = true;
        break;
      }
    }

    if (!is_select) rooms.push([start, end]);
  }
  console.log(rooms);
  return rooms.length;
}

console.log(
  solution([
    ["10:20", "12:30"],
    ["10:20", "12:30"],
    ["10:20", "12:30"],
  ])
);
