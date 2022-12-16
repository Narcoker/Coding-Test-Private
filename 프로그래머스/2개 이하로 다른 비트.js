function solution(numbers) {
    let answer = [];
    for (let num of numbers) {
        if (num % 2 === 1) {
            let bin = ("0" + num.toString(2));
            for (let i = bin.length - 1; i >= 0; i--) {
                if (bin[i - 1] === "0" && bin[i] === "1") {
                    answer.push(Number.parseInt(bin.substring(0, i - 1) + "10" + bin.substring(i + 1, bin.length), 2))
                    break;
                }
            }
        }
        else
            answer.push(num + 1);
    }
    return answer;
}