const path =
  process.platform === "linux" ? "/dev/stdin" : __dirname + "\\data.txt";
const input = require("fs").readFileSync(path).toString().trim().split(/\r?\n/);

function validate(password) {
  const vowels = new Set(["a", "e", "i", "o", "u"]);
  let v_count = 0;
  let v_con_count = 0;
  let c_con_count = 0;
  let pre_ch = "";

  for (let i = 0; i < password.length; i++) {
    if (vowels.has(password[i])) {
      v_count++;
      v_con_count++;
      c_con_count = 0;
    } else {
      v_con_count = 0;
      c_con_count++;
    }

    if (v_con_count === 3 || c_con_count === 3) return false;

    if (!(pre_ch === "e" || pre_ch === "o") && pre_ch === password[i])
      return false;
    pre_ch = password[i];
  }

  if (v_count === 0) return false;

  return true;
}

function solution(passwords) {
  for (let i = 0; i < passwords.length - 1; i++) {
    if (validate(passwords[i])) console.log(`<${passwords[i]}> is acceptable.`);
    else console.log(`<${passwords[i]}> is not acceptable.`);
  }
}

solution(input);
