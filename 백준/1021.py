from collections import deque

import sys
sys.stdin = open('data.txt', 'r')
input = sys.stdin.readline

N, M = map(int, input().split(" "))
numbers = list(map(int, input().split(" ")))

def solution(N, M, numbers):
    answer = 0
    dq = deque([i for i in range(1, N + 1)])

    for number in numbers:
        target_index = dq.index(number)
        while dq[0] != number:
            if target_index < len(dq) / 2:
                dq.rotate(-1)
            else:
                dq.rotate(1)
            answer += 1

        dq.popleft()

    print(answer)


solution(N, M, numbers)

