import sys

sys.stdin = open("input.txt", 'r')

N, M = map(int, input().split()) # 나무의 수, 가져가려는 나무의 길이
trees = list(map(int, input().split()))

left = 1
right = max(trees)
answer = 0

def get_sum_length(trees, cutting_length):
    result = 0

    for tree in trees:
        if tree - cutting_length > 0:
            result += tree - cutting_length

    return result

while left <= right:
    mid = (left + right) // 2

    sum_length = get_sum_length(trees, mid)
    if sum_length >= M:
        answer = max(answer, mid)
        left = mid + 1
    else:
        right = mid - 1

print(answer)



