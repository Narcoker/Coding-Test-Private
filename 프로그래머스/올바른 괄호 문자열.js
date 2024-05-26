var answer = "";

function is_correct(p) {
  // 균형잡힌 괄호 문자열 체크
  let stack = [];
  for (let c of p) {
    if (p.length === 0) {
      stack.push(c);
      continue;
    }

    if (c === ")") {
      if (stack.at(-1) === "(") {
        stack.pop();
      }
    } else {
      stack.push(c);
    }
  }

  return stack.length === 0;
}

function make_answer(p) {
  // 두 균형 잡힌 괄호 문자열 u,v로 분리
  let left_count = 0;
  let right_count = 0;
  let [u, v] = ["", ""];
  for (let i = 0; i < p.length; i++) {
    if (p[i] === "(") left_count++;
    else right_count++;

    if (left_count != 0 && right_count != 0 && left_count === right_count) {
      u = p.slice(0, i + 1);
      if (i !== p.length - 1) v = p.slice(i + 1, p.length);
      break;
    }
  }

  if (u === "") return;

  if (is_correct(u)) {
    answer += u;
    make_answer(v);
  } else {
    answer += "(";
    make_answer(v);
    answer += ")";

    u = u.slice(1, u.length - 1);
    let new_u = "";
    for (let i = 0; i < u.length; i++) {
      if (u[i] === "(") new_u += ")";
      else new_u += "(";
    }

    answer += new_u;
  }
}

function solution(p) {
  if (is_correct(p)) return p;

  make_answer(p);

  return answer;
}
