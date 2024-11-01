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

cases = []
case = []


def get_cases():
    global cases, case
    vector = ["U", "D", "L", "R"]

    for start_vector in vector:
        get_case(start_vector, [start_vector])


def get_case(prev, case):
    if len(case) >= 10:
        cases.append(case)
        return

    vector = ["U", "D", "L", "R"]
    for v in vector:
        if prev != v:
            get_case(v, case + [v])


get_cases()


def bfs():
    global red_ball, blue_ball, answer, count, end_flag, cases

    for case in cases:
        blue_ball = s_blue_ball
        red_ball = s_red_ball
        end_flag = False
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

                execute(ball[1], move)

            if red_ball == (-1, -1) and blue_ball != (-1, -1):
                answer = min(answer, count)
                if count == 1:
                    return


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

            red_ball = (next_y, next_x)
            if (next_y, next_x) == end_point:
                # print("빨간공 골인 게임 성공")
                red_ball = (-1, -1)
                return


        elif ball_type == "Blue":
            if (next_y, next_x) == red_ball:
                return

            blue_ball = (next_y, next_x)
            if (next_y, next_x) == end_point:
                # print("파란공 골인 게임 실패")
                blue_ball = (-1, -1)
                end_flag = True
                return

        execute(ball_type, move)


bfs()

print(answer if answer != 999 else -1)
