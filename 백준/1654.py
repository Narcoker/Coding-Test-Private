import sys

sys.stdin = open("data.txt", 'r')

N, K = map(int, input().split())
ropes = []
left = 1
right = 1

answer = 0
for _ in range(N):
    rope = int(input())
    right = max(right, rope)
    ropes.append(rope)


while left <= right:
    mid = (left + right) // 2
    result = 0

    for rope in ropes:
        result += rope // mid

    if result < K:
        right = mid - 1

    else:
        left = mid + 1
        answer = mid


print(answer)



