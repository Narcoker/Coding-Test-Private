import sys

sys.stdin = open('input.txt', 'r')

N, M = map(int, input().split())
arr = list(map(int, input().split()))


def back_tracking(answer, visited):
    if len(answer) == M:
        print(*answer)
        return
    prev = 0
    for i in range(len(arr)):
        if not visited[i] and prev < arr[i]:
            visited[i] = True
            answer.append(arr[i])
            back_tracking(answer, visited)
            visited[i] = False
            answer.pop()
            prev = arr[i]


def solution(N, M, arr):
    arr.sort()
    answer = []
    visited = [False] * N
    back_tracking(answer, visited)
    return


solution(N, M, arr)
