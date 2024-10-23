import sys

sys.stdin = open('input.txt', 'r')

N, M = map(int, input().split())
arr = list(map(int, input().split()))

def back_tracking(answer):
    if len(answer) == M:
        print(*answer)
        return
    used = set()

    for i in range(len(arr)):
        if arr[i] not in used:
            answer.append(arr[i])
            back_tracking(answer)
            answer.pop()
            used.add(arr[i])

def solution(N, M, arr):
    answer = []

    arr.sort()
    back_tracking(answer)
    return

solution(N,M,arr)