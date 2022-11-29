function solution(number, limit, power) {
    function getMeasure(num) {
        let count = 0;
        for (let i = 1; i <= Math.sqrt(num); i++)
            if (num % i === 0) {
                if (Math.floor(num / i) === i) count++;
                else count += 2;
            }
        return count;
    }

    let answer = 0;

    for (let i = 1; i <= number; i++) {
        let atk = getMeasure(i);
        answer += atk > limit ? power : atk;
    }
    return answer;
}