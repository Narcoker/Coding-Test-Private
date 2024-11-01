from collections import deque

import sys
import time

start = time.time()

sys.stdin = open("data.txt", 'r')

N, M = map(int, input().split(" "))
board = [list(input()) for _ in range(N)]
walls = set()
s_blue_ball = (-1, -1)
s_red_ball = (-1, -1)
end_point = (-1, -1)

answer = 999

end_flag = False
count = 0

blue_ball = s_blue_ball
red_ball = s_red_ball

for row in range(N):
    for col in range(M):
        value = board[row][col]
        if value == "#":
            walls.add((row, col))
            pass
        elif value == "R":
            s_red_ball = (row, col)
            pass
        elif value == "B":
            s_blue_ball = (row, col)
            pass
        elif value == "O":
            end_point = (row, col)


def bfs(start, end):
    queue = deque([start])

    vector = {
        "U": (-1, 0),
        "D": (1, 0),
        "L": (0, -1),
        "R": (0, 1)
    }

    visited = [[(-1, -1) for _ in range(M)] for _ in range(N)]
    visited[start[0]][start[1]] = start
    while queue:
        y, x = queue.popleft()

        for key, v in vector.items():
            dy, dx = v
            next_y = y + dy
            next_x = x + dx

            if 0 <= next_y < N and 0 <= next_x < M and board[next_y][next_x] != "#" and visited[next_y][next_x] == (
                    -1, -1):
                queue.append((next_y, next_x))
                visited[next_y][next_x] = (y, x)

                if (next_y, next_x) == end:
                    result = [(next_y, next_x)]
                    root_y, root_x = next_y, next_x
                    while True:
                        next_root_y, next_root_x = visited[root_y][root_x]

                        if (next_root_y, next_root_x) == (root_y, root_x):
                            break

                        result.append((next_root_y, next_root_x))
                        root_y, root_x = next_root_y, next_root_x

                    result.reverse()
                    print(f'result: {result}')

                    case = []
                    for i in range(0, len(result) - 1):
                        A_y, A_x = result[i]
                        B_y, B_x = result[i + 1]

                        dy = B_y - A_y
                        dx = B_x - A_x

                        if (dy, dx) == (-1, 0):
                            if not case or (case and case[-1]) != "U":
                                case.append("U")
                        elif (dy, dx) == (1, 0):
                            if not case or (case and case[-1]) != "D":
                                case.append("D")
                        elif (dy, dx) == (0, -1):
                            if not case or (case and case[-1]) != "L":
                                case.append("L")
                        elif (dy, dx) == (0, 1):
                            if not case or (case and case[-1]) != "R":
                                case.append("R")

                    print(f"case: {case}")

                    global red_ball, blue_ball, answer, count, end_flag
                    blue_ball = s_blue_ball
                    red_ball = s_red_ball

                    count = 0
                    for move in case:
                        count += 1
                        move_order = [(red_ball, "Red"), (blue_ball, "Blue")]
                        if move == "U":
                            move_order.sort(key=lambda pos: (pos[0][0]))
                        elif move == "D":
                            move_order.sort(key=lambda pos: (-pos[0][0]))
                        elif move == "L":
                            move_order.sort(key=lambda pos: (pos[0][1]))
                        elif move == "R":
                            move_order.sort(key=lambda pos: (-pos[0][1]))

                        for ball in move_order:
                            if end_flag == True or count > answer:
                                break

                            print(f'{ball[1]}공 {move} 이동')
                            execute(ball[1], move)

                            for row in range(N):
                                for col in range(M):
                                    if board[row][col] == "#":
                                        print("#", end="")
                                    elif (row, col) == red_ball:
                                        print("R", end="")
                                    elif (row, col) == blue_ball:
                                        print("B", end="")
                                    else:
                                        print(".", end="")
                                print()
                            print()

                        if red_ball == (-1, -1) and blue_ball != end_point:
                            # print(f"answer 할당, count: {count}")
                            answer = min(answer, count)
                            break
                        if blue_ball == end_point:
                            end_flag = False
                            visited[end_point[0]][end_point[1]] = (-1, -1)
                            continue
                        # print("턴종료")
                        # print()


def execute(ball_type, move):
    global red_ball, blue_ball, answer, count, end_flag

    if end_flag == True or count > answer:
        return

    y, x = red_ball if ball_type == "Red" else blue_ball

    vector = {
        "U": (-1, 0),
        "D": (1, 0),
        "L": (0, -1),
        "R": (0, 1)
    }

    dy, dx = vector[move]
    next_y = y + dy
    next_x = x + dx

    if 0 < next_y < N and 0 < next_x < M:
        if (next_y, next_x) in walls:
            return

        if ball_type == "Red":
            if (next_y, next_x) == blue_ball:
                return

            if (next_y, next_x) == end_point:
                print("빨간공 골인 게임 성공")
                red_ball = (-1, -1)
                return

            red_ball = (next_y, next_x)

        elif ball_type == "Blue":
            if (next_y, next_x) == red_ball:
                return

            if (next_y, next_x) == end_point:
                print("파란공 골인 게임 실패")
                end_flag = True
                return

            blue_ball = (next_y, next_x)

        execute(ball_type, move)


bfs(s_red_ball, end_point)

print(answer if answer != 999 else -1)
# print(time.time() - start)
