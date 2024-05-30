function gcd(a,b){
    let [big,small] = a>b ? [a,b] : [b,a];

    while(small != 0){
        let nmg = big % small;
        big= small;
        small = nmg;
    }

    return big;
}

function solution(w, h) {
    let gcd_value = gcd(w,h);
    var answer = w*h - (w/gcd_value + h/gcd_value - 1) * gcd_value
    return answer;
}



// function solution(w,h){
//    const slope = h / w;
//    let result = 0;
//
//    for(let i = 1; i <= w; i++){
//        result += Math.ceil(slope * i);
//    }
//
//    return ((h * w) - result) * 2;
//}