import sys

sys.stdin = open('data.txt', 'r')

N, C = map(int, input().split())
arr = []

answer = 0

left = 1
right = 1
for _ in range(N):
    num = int(input())
    right = max(right, num)
    arr.append(num)

arr.sort()

while left <= right:
    mid = (left + right) // 2
    current = arr[0]
    count = 1

    for i in range(1, len(arr)):
        if arr[i] - current >= mid:
            current = arr[i]
            count += 1

    if count < C:
        right = mid - 1

    else:
        left = mid + 1
        answer = max(answer, mid)

print(answer)
