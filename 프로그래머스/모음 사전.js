function solution(word) {
    function getResult(str) {
        if (str === word) return true;
        if (str.length === 5) return false;
        for (let i = 0; i < words.length; i++) {
            answer++;
            if (getResult(str + words[i])) return true;
        }
        return false;
    }
    let answer = 0;
    let words = ["A", "E", "I", "O", "U"];
    getResult("");
    return answer;
}