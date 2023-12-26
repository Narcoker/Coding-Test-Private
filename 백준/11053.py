import sys
sys.stdin = open("data.txt", 'r')

N = int(sys.stdin.readline())
arr = list(map(int, sys.stdin.readline().split(" ")))

def solution():
    dp = [1] * N

    for target_index in range(1, N):
        for prev_target_index in range(0, target_index):
            if arr[target_index] > arr[prev_target_index]:
                dp[target_index] = max(dp[prev_target_index] + 1, dp[target_index])

    print(max(dp))
    return

solution()