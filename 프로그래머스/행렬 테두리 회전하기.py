from collections import deque


def solution(rows, columns, queries):
    answer = []
    board = [[i * columns + j + 1 for j in range(columns)] for i in range(rows)]
    for row in board:
        print(row)

    def selectTarget(querie):
        y1, x1, y2, x2 = [i - 1 for i in querie]
        target = []
        cur_y, cur_x = y1, x1
        size_y = y2 - y1 + 1
        size_x = x2 - x1 + 1

        for i in range(size_x):
            target.append(board[cur_y][cur_x])
            cur_x += 1

        cur_y, cur_x = cur_y + 1, cur_x - 1

        for i in range(size_y - 1):
            target.append(board[cur_y][cur_x])
            cur_y += 1

        cur_y, cur_x = cur_y - 1, cur_x - 1

        for i in range(size_x - 1):
            target.append(board[cur_y][cur_x])
            cur_x -= 1

        cur_y, cur_x = cur_y - 1, cur_x + 1

        for i in range(size_y - 2):
            target.append(board[cur_y][cur_x])
            cur_y -= 1

        answer.append(min(target))
        return target

    def rotate(dq, querie):
        dq.rotate(1)
        y1, x1, y2, x2 = [i - 1 for i in querie]
        cur_y, cur_x = y1, x1
        size_y = y2 - y1 + 1
        size_x = x2 - x1 + 1

        index = 0
        for i in range(size_x):
            board[cur_y][cur_x] = dq[index]
            cur_x += 1
            index += 1

        cur_y, cur_x = cur_y + 1, cur_x - 1

        for i in range(size_y - 1):
            board[cur_y][cur_x] = dq[index]
            cur_y += 1
            index += 1

        cur_y, cur_x = cur_y - 1, cur_x - 1

        for i in range(size_x - 1):
            board[cur_y][cur_x] = dq[index]
            cur_x -= 1
            index += 1

        cur_y, cur_x = cur_y - 1, cur_x + 1

        for i in range(size_y - 2):
            board[cur_y][cur_x] = dq[index]
            cur_y -= 1
            index += 1

    for querie in queries:
        dq = deque(selectTarget(querie))
        rotate(dq, querie)

    return answer


# print(solution(6, 7, [[2, 2, 5, 4], [3, 3, 6, 6], [5, 1, 6, 3]]))

for i in range(3):
    print(i)

print(i)