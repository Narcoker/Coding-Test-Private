import sys

sys.stdin = open('input.txt', 'r')

N, C = map(int, input().split())
home = []

for _ in range(N):
    pos = int(input())
    home.append(pos)

home.sort()

answer = 0
left = 1
right = home[-1]


def get_AP_count(home, mid):
    count = 1
    left_AP = home[0]
    for i in range(1, len(home)):
        if home[i] - left_AP < mid:
            continue
        else:
            count += 1
            left_AP = home[i]

    return count

while left <= right:
    mid = (left + right) // 2

    if get_AP_count(home, mid) < C:
        right = mid - 1
    else:
        left = mid + 1
        answer = max(answer,mid)

print(answer)