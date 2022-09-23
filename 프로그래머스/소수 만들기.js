function solution(nums) {
    let answer = 0;
    function search(index, sum, count) {
        if (count === 3) {
            let max = Math.sqrt(sum);
            for (let i = 2; i < max; i++) {
                if (sum % i === 0) break;
                if (i === Math.floor(max)) answer++;
            }
            return;
        }
        for (let i = index; i < nums.length; i++) {
            search(i + 1, sum + nums[i], count + 1);
        }
    }

    for (let i = 0; i < nums.length; i++) {
        search(i + 1, nums[i], 1);
    }

    return answer;
}
