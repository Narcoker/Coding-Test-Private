function solution(s) {
    s = s.toLowerCase().split("");
    let answer = s.reduce((acc, value) => {
        if (value === "p") acc[0]++;
        if (value === "y") acc[1]++;
        return acc;
    }, [0, 0]);

    return (answer[0] - answer[1]) === 0 ? true : false;
}