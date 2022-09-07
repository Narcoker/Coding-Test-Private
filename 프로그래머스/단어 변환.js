// [프로그래머스] 단어 변환

function solution(begin, target, words) {
    if (words.indexOf(target) === -1)
        return 0;
    let visited = new Array(words.length).fill(false);
    let queue = [[begin, 0]];
    let value;
    while (queue.length > 0) {
        value = queue.shift();

        for (let i = 0; i < words.length; i++) {
            if (visited[i] === false) {
                let diff = 0;
                let index = words.indexOf(words[i]);

                for (let k = 0; k < words[0].length; k++) {
                    if (value[0][k] !== words[i][k])
                        diff++;
                }
                if (diff === 1 && visited[index] === false) {
                    if (words[i] === target) return value[1] + 1;
                    queue.push([words[i], value[1] + 1]);
                    visited[index] = true;
                };
            }
        }
    }
    return 0;
}