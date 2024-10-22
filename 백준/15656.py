import sys

sys.stdin = open('input.txt', 'r')

N, M = map(int, input().split())
arr = list(map(int, input().split()))

def back_tracking(answer):
    if len(answer) == M:
        print(*answer)
        return

    for i in range(len(arr)):
        answer.append(arr[i])
        back_tracking(answer)
        answer.pop()

    return

def solution(N,M, arr):
    arr.sort()
    answer = []
    back_tracking(answer)

    return

solution(N, M, arr)