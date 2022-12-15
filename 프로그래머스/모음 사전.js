function solution(word) {
    function isCorrect(str) {
        if (str === word) return true;
        if (str.length === 5) return false;
        for (let i = 0; i < words.length; i++) {
            answer++;
            if (isCorrect(str + words[i])) {
                return true;
            }
        }
    }
    let answer = 0;
    let words = ["A", "E", "I", "O", "U"];
    isCorrect("");
    return answer;
}