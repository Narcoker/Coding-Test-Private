function get_num(num){
    if(num === 1)
        return 0;

    let result = 1
    for(let i = 2; i <= Math.ceil(Math.sqrt(num)); i++){
        if(num % i === 0 && num / i <= 10_000_000){
            return num / i;
        }
        if(num % i === 0 && num / i > 10_000_000){
            result = i;
        }


    }
    return result;
}

function solution(begin, end) {
    var answer = [];

    for(let i = begin; i<=end; i++){
        answer.push(get_num(i))
    }

    return answer;
}