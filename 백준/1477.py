import sys

sys.stdin = open("data.txt", 'r')

N, M, L = map(int, input().split())

rest_areas = [0] + list(map(int, input().split())) + [L]

rest_areas.sort()

left = 1
right = L - 1
answer = 100000000

while left <= right:
    mid = (left + right) // 2
    count = 0

    for i in range(1, len(rest_areas)):
        if rest_areas[i] - rest_areas[i-1] > mid:
            count += (rest_areas[i] - rest_areas[i-1] - 1) // mid

    if count > M: # 더 세운 경우
        left = mid + 1
    elif count < M: # 적게 새운 경우
        right = mid - 1
    else:
        right = mid - 1
        answer = mid

print(answer)
