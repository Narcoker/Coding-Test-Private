function solution(info, n, m) {
    // 행: 훔친 물건 인덱스
    // 열: b의 최소 누적 흔적
    const dp = Array.from({length: info.length+1}, () => new Array(m).fill(Infinity));
    dp[0][0] = 0;
    
    for(let i = 1; i < info.length+1; i++){
        let [a, b] = info[i-1];
        
        for(let evid = 0; evid < m; evid++){
            // a가 안훔치거나 훔치거나
            dp[i][evid] = Math.min(dp[i][evid], dp[i-1][evid] + a);
            
            // b가 안훔치거나 훔치거나
            if(evid + b < m)
                dp[i][evid + b] = Math.min(dp[i][evid + b], dp[i-1][evid]);
        }
    }
    
    let answer = Infinity;
    for(let evid = 0; evid < m; evid++){
        answer = Math.min(answer, dp[info.length][evid]);
    }
    
    if(answer >= n) return -1;
    else return answer;
}