import sys

sys.stdin = open("data.txt", 'r')

M, N = map(int, input().split())
candies = list(map(int, input().split()))

count_candies = {}

left = 1
right = 1

answer = 0

for candy in candies:
    right = max(right, candy)
    if candy in count_candies.keys():
        count_candies[candy] += 1
    else:
        count_candies[candy] = 1

while left <= right:
    mid = (left + right) // 2

    result = 0
    for candy in count_candies.keys():
        result += (candy // mid) * count_candies[candy]

    if result < M:
        right = mid - 1
    else:
        left = mid + 1
        answer = max(answer, mid)

print(answer)
