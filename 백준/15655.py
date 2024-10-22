import sys

sys.stdin = open('input.txt', 'r')

N, M = map(int, input().split())
arr = list(map(int, input().split()))


def back_tracking(answer, arr, visited, prev):
    if len(answer) == M:
        print(*answer)
        return

    for i in range(len(arr)):
        if not visited[i] and prev <= arr[i]:
            visited[i] = True
            answer.append(arr[i])
            back_tracking(answer, arr, visited, arr[i])
            visited[i] = False
            answer.pop()
    return

def solution(N, M, arr):
    arr.sort()
    answer = []
    visited = [False] * N
    back_tracking(answer, arr, visited, 0)
    return

solution(N, M, arr)