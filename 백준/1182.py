import sys

sys.stdin = open('data.txt', 'r')


def count_subsequence(idx, result):
    global answer

    if idx == N:
        return

    result += arr[idx]

    if result == S:
        answer += 1

    count_subsequence(idx + 1, result)
    count_subsequence(idx + 1, result - arr[idx])


N, S = map(int, input().split(" "))
arr = list(map(int, input().split(" ")))

answer = 0

count_subsequence(0, 0)
print(answer)
