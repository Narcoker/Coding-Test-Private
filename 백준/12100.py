from collections import deque
import sys

sys.stdin = open('data.txt')

N = int(input())
board = [list(map(int, input().split(" "))) for _ in range(N)]

moves = ["U", "D", "L", "R"]
answer = 0


def make_case(case):
    if len(case) == 5:
        test_board = [[col for col in row] for row in board]
        execute(case, test_board)
        return

    for move in moves:
        make_case(case + [move])


def execute(case, board):
    global answer
    for move in case:
        if move == "U":
            for col in range(0, N):
                queue = deque([])
                for row in range(0, N):
                    queue.append(board[row][col])

                result_arr = [0 for _ in range(N)]
                target_index = 0

                for _ in range(N):
                    if not queue:
                        break
                    A, B = 0, 0
                    A = queue.popleft()
                    if queue:
                        B = queue.popleft()

                    if A == 0 and B != 0:
                        queue.appendleft(B)

                    elif A != 0 and B == 0:
                        queue.appendleft(A)

                    elif A != 0 and B != 0:
                        if A == B:
                            result_arr[target_index] = A + B
                            target_index += 1
                        else:
                            result_arr[target_index] = A
                            target_index += 1
                            queue.appendleft(B)

                if queue:
                    result_arr[target_index] = queue.popleft()

                for i in range(0, N):
                    board[i][col] = result_arr[i]
            continue

        if move == "D":
            for col in range(0, N):
                queue = deque([])
                for row in range(0, N):
                    queue.append(board[row][col])

                result_arr = [0 for _ in range(N)]
                target_index = 0

                for _ in range(N):
                    if not queue:
                        break
                    A, B = 0, 0
                    A = queue.pop()
                    if queue:
                        B = queue.pop()

                    if A == 0 and B != 0:
                        queue.append(B)

                    elif A != 0 and B == 0:
                        queue.append(A)

                    elif A != 0 and B != 0:
                        if A == B:
                            result_arr[target_index] = A + B
                            target_index += 1
                        else:
                            result_arr[target_index] = A
                            target_index += 1
                            queue.append(B)

                if queue:
                    result_arr[target_index] = queue.popleft()

                result_arr.reverse()
                for i in range(0, N):
                    board[i][col] = result_arr[i]
            continue
        if move == "L":
            for row in range(0, N):
                queue = deque([])
                for col in range(0, N):
                    queue.append(board[row][col])

                result_arr = [0 for _ in range(N)]
                target_index = 0

                for _ in range(N):
                    if not queue:
                        break
                    A, B = 0, 0
                    A = queue.popleft()
                    if queue:
                        B = queue.popleft()

                    if A == 0 and B != 0:
                        queue.appendleft(B)

                    elif A != 0 and B == 0:
                        queue.appendleft(A)

                    elif A != 0 and B != 0:
                        if A == B:
                            result_arr[target_index] = A + B
                            target_index += 1
                        else:
                            result_arr[target_index] = A
                            target_index += 1
                            queue.appendleft(B)

                if queue:
                    result_arr[target_index] = queue.popleft()

                for i in range(0, N):
                    board[row][i] = result_arr[i]
            continue
        if move == "R":
            for row in range(0, N):
                queue = deque([])
                for col in range(0, N):
                    queue.append(board[row][col])

                result_arr = [0 for _ in range(N)]
                target_index = 0

                for _ in range(N):
                    if not queue:
                        break
                    A, B = 0, 0
                    A = queue.pop()
                    if queue:
                        B = queue.pop()

                    if A == 0 and B != 0:
                        queue.append(B)

                    elif A != 0 and B == 0:
                        queue.append(A)

                    elif A != 0 and B != 0:
                        if A == B:
                            result_arr[target_index] = A + B
                            target_index += 1
                        else:
                            result_arr[target_index] = A
                            target_index += 1
                            queue.append(B)

                if queue:
                    result_arr[target_index] = queue.popleft()

                result_arr.reverse()

                for i in range(0, N):
                    board[row][i] = result_arr[i]
            continue


    for row in board:
        for value in row:
            answer = max(answer, value)



make_case([])
print(answer)
