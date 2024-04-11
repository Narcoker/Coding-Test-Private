from collections import deque

import sys

sys.stdin = open("data.txt", 'r')

vectors = [(-1, 0), (-1, -1), (0, -1), (1, -1), (1, 0), (1, 1), (0, 1), (-1, 1)]

class Shark:
    def __init__(self, y, x, result, v_num):
        self.y = y
        self.x = x
        self.result = result
        self.v_num = v_num

    def copy(self):
        return Shark(self.y, self.x, self.result, self.v_num)

    def eat(self, board, fishes):
        fish_num = board[self.y][self.x]
        # print(f"==== 현재 상어 위치: {self.y, self.x} {fish_num}번 물고기 먹음 방향: {fishes[fish_num].v_num}")
        self.result += fish_num
        self.v_num = fishes[fish_num].v_num

        board[self.y][self.x] = 0
        fishes[fish_num].y = -1
        fishes[fish_num].x = -1
        fishes[fish_num].v_num = -1

    def move(self, board, count):
        dy, dx = vectors[self.v_num]
        next_y = self.y + (dy * count)
        next_x = self.x + (dx * count)

        # 벽인 경우
        if not (0 <= next_y < 4 and 0 <= next_x < 4):
            return False

        # 물고기가 없는 경우
        if board[next_y][next_x] == 0:
            return False

        # 이동한 경우
        self.y, self.x = next_y, next_x
        return True


class Fish:
    def __init__(self, num, y, x, v_num):
        self.num = num
        self.y = y
        self.x = x
        self.v_num = v_num

    def copy(self):
        return Fish(self.num, self.y, self.x, self.v_num)

    def get_vector(self):
        return vectors[self.v_num]

    def roll_vector(self):
        self.v_num = (self.v_num + 1) % len(vectors)

    def move(self, shark, board, fishes):
        if (self.y, self.x) == (-1, -1):
            return

        # 상어가 있거나 벽인 경우 회전
        for _ in range(len(vectors)):
            dy, dx = self.get_vector()
            next_y = self.y + dy
            next_x = self.x + dx

            if (next_y, next_x) == (shark.y, shark.x):
                self.roll_vector()
                continue

            elif not (0 <= next_y < 4 and 0 <= next_x < 4):
                self.roll_vector()
                continue

            # 빈 칸
            elif board[next_y][next_x] == 0:
                board[next_y][next_x] = self.num
                board[self.y][self.x] = 0
                self.y, self.x = next_y, next_x

                return
            else:
                # 다른 물고기가 있는 칸인 경우 위치 변경
                target_fish = board[next_y][next_x]
                board[next_y][next_x] = board[self.y][self.x]
                board[self.y][self.x] = target_fish

                fishes[target_fish].y, fishes[target_fish].x = self.y, self.x
                self.y, self.x = next_y, next_x
                return




fishes = [None for _ in range(16 + 1)]
board = [[None for _ in range(4)] for _ in range(4)]

for row in range(4):
    row_data = list(map(int, input().split(" ")))
    for i in range(0, 8, 2):
        col = i // 2
        num, vector = row_data[i], row_data[i + 1] - 1
        fishes[num] = Fish(num, row, col, vector)
        board[row][col] = num



shark = Shark(0, 0, 0, 0)

# 상어 투입
shark.eat(board, fishes)

stack = deque([(shark, fishes, board)])
answer = shark.result

while stack:
    cur_shark, cur_fishes, cur_board = stack.popleft()
    # print('물고기 이동전')
    # for row in cur_board:
    #     for fish in row:
    #         print(f'{fish}({cur_fishes[fish].v_num if fish !=0 else 0})', end=" ")
    #     print()

    # print()
    # 물고기 이동
    for i in range(1, len(cur_fishes)):
        cur_fishes[i].move(cur_shark, cur_board, cur_fishes)

    # print('물고기 이동 후')
    # for row in cur_board:
    #     for fish in row:
    #         print(f'{fish}({cur_fishes[fish].v_num if fish != 0 else 0})', end=" ")
    #     print()

    # print(cur_shark.result)
    # print(f'상어 위치: {cur_shark.y, cur_shark.x}, 상어 방향: {cur_shark.v_num}')

    test = 0
    # 상어 - 다음 위치 스택에 넣기
    for count in range(1, 4):
        next_shark = cur_shark.copy()
        next_fishes = [None] + [fish.copy() for fish in cur_fishes[1:]]
        next_board = [[cur_board[row][col] for col in range(4)] for row in range(4)]

        if next_shark.move(next_board, count):
            next_shark.eat(next_board, next_fishes)
            answer = max(answer, next_shark.result)
            test += 1

            stack.append((next_shark, next_fishes, next_board))
    #
    # print(f'이동 가능: {test}')
    # print()

print(answer)
