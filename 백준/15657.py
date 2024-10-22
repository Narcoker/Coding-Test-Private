import sys

sys.stdin = open('input.txt', 'r')

N,M = map(int, input().split())
arr = list(map(int, input().split()))

def back_tracking(answer, prev):
    if len(answer) == M:
        print(*answer)
        return

    for i in range(len(arr)):
        if prev <= arr[i]:
            answer.append(arr[i])
            back_tracking(answer, arr[i])
            answer.pop()

    return

def solution(N,M,arr):
    arr.sort()
    answer = []
    back_tracking(answer, 0)
    return

solution(N, M, arr)
