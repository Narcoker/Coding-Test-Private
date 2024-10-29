# 자바스크립트 제출 버그 있어서 파이썬으로 제출

import sys

def bisearch(target, arr):
    left = 0
    right = len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] < target:
            left = mid + 1
        elif arr[mid] > target:
            right = mid - 1
        else:
            return mid
    return -1

def main():
    n, q = map(int, input().split())
    arr = list(map(int, input().split()))
    
    # 배열 정렬
    arr.sort()
    
    for i in range(q):
        mid = int(input())
        
        mid_idx = bisearch(mid, arr)
        
        # mid_idx가 -1인 경우 0으로 대체하여 왼쪽과 오른쪽 계산
        left = mid_idx if mid_idx != -1 else 0
        right = n - mid_idx - 1 if mid_idx != -1 else n
        
        result = left * right
        print(result)

if __name__ == "__main__":
    main()

# 자바스크립트 코드

# const readline = require('readline');
# const rl = readline.createInterface({
#   input: process.stdin,
#   output: process.stdout,
# });

# const lines = [];

# rl.on('line', (line) => {
#     lines.push(line);
# }).on('close', () => {
#     let lineIndex = 0;
#     const [n, q] = lines[lineIndex++].split(" ").map(Number);
#     const arr = lines[lineIndex++].split(" ").map(Number);
#     arr.sort((a,b) => a-b)
#     for(let i = 0; i < q; i++){
#         const mid = Number(lines[lineIndex++]);
#         const midIdx = bisearch(mid, arr);

#         const left = midIdx > 0 ? midIdx : 0;
#         const right = n - midIdx - 1 > 0 ? n - midIdx - 1 : 0;
#         const result = left * right;
#         console.log(result)
#         // 1 2 3 5 6
#     }
# });

# function bisearch(target, arr){
#     let left = 0;
#     let right = arr.length - 1;
    
#     while(left <= right){
#         mid = Math.floor((left+right)/2);
        
#         if(arr[mid] < target){
#             left = mid + 1;
#         }
#         else if(arr[mid] > target){
#             right = mid - 1;
#         }
#         else{
#             return mid;
#         }
#     }

#     return -1;
# }

