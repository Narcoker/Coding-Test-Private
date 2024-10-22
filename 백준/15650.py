import sys

sys.stdin = open('input.txt', 'r')

N, M = map(int, input().split())


def back_tracking(visited, answer, prev):
    if len(answer) == M:
        print(*answer)
        return

    for i in range(1, N+1):
        if not visited[i] and prev < i:
            visited[i] = True
            answer.append(i)
            back_tracking(visited, answer, i)
            visited[i] = False
            answer.pop()

    return


def solution(N, M):
    visited = [False] * (N+1)
    answer = []

    back_tracking(visited, answer, 0)
    return


solution(N, M)
