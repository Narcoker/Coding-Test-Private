function solution(N, stages) {
    let remain = stages.length;
    let stage = 1;
    let fail = [];
    stages.sort((a,b)=>b-a);
    for(let k = 0; k < N; k++){
        let count = 0;
        for(let i = stages.length-1; i >= 0; i--){
            if(stages[i] <= stage){
                stages.pop();
                count++;
            } 
            else break;
        }
        fail.push([k+1,count/remain]);
        remain -= count;
        stage++;
    }
    fail.sort((a,b)=>b[1]-a[1]);
    return fail.reduce((arr,v)=>{
        arr.push(v[0]);
        return arr;
    },[])
}