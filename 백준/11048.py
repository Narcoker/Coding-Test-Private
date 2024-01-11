import sys

sys.stdin = open('data.txt', 'r')

input = sys.stdin.readline

N, M = map(int, input().split(" "))
arr = [[0] * M]
for _ in range(N):
    row = [0] + list(map(int, input().split(" ")))
    arr.append(row)


def solution(N, M, arr):
    dp = [[0] * (M + 1) for _ in range(N + 1)]

    for row in range(1, N + 1):
        for col in range(1, M + 1):
            dp[row][col] = max(dp[row - 1][col], dp[row][col - 1], dp[row - 1][col - 1]) + arr[row][col]

    print(dp[N][M])
    return


solution(N, M, arr)
