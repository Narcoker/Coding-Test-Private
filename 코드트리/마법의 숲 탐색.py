from collections import deque

import sys

sys.stdin = open('input.txt', 'r')

R, C, K = map(int, input().split(" "))
answer = 0


class Engel:
    count = 0
    exit_vector = [(-1, 0), (0, 1), (1, 0), (0, -1)]
    range_vector = [(-1, 0), (0, -1), (0, 0), (0, 1), (1, 0)]

    def __init__(self, c, d):
        self.name = Engel.count + 1
        self.y = -2
        self.x = c
        self.exit_index = d
        Engel.count += 1

    def move(self):
        if not self.can_down(0):
            if self.can_left() and self.can_down(-1):
                self.y += 1
                self.x -= 1
                self.roll_left()
                print("왼쪽 회전")
            else:
                if self.can_right() and self.can_down(1):
                    self.y += 1
                    self.x += 1
                    self.roll_right()
                    print("오른쪽 회전")
                else:
                    return
        else:
            self.y += 1

        self.move()

        return

    def can_down(self, after):
        check_pos = [(self.y, self.x - 1), (self.y + 1, self.x), (self.y, self.x + 1)]
        for i, (y, x) in enumerate(check_pos):
            next_y = y + 1
            next_x = x + after

            if next_y < 0 and 0 <= next_x < C:
                continue

            elif 0 <= next_y < R and 0 <= next_x < C and forest[next_y][next_x] == 0:
                continue
            else:
                return False

        return True

    def can_left(self):
        check_pos = [(self.y - 1, self.x), (self.y, self.x - 1), (self.y + 1, self.x)]
        for i, (y, x) in enumerate(check_pos):
            next_y = y
            next_x = x - 1

            if next_y < 0 and 0 <= next_x < C:
                continue

            elif 0 <= next_y < R and 0 <= next_x < C and forest[next_y][next_x] == 0:
                continue
            else:
                return False

        return True

    def can_right(self):
        check_pos = [(self.y - 1, self.x), (self.y, self.x + 1), (self.y + 1, self.x)]
        for i, (y, x) in enumerate(check_pos):
            next_y = y
            next_x = x + 1

            if next_y < 0 and 0 <= next_x < C:
                continue

            elif 0 <= next_y < R and 0 <= next_x < C and forest[next_y][next_x] == 0:
                continue
            else:
                return False

        return True

    def roll_left(self):
        self.exit_index = (self.exit_index - 1) % len(Engel.exit_vector)
        return

    def roll_right(self):
        self.exit_index = (self.exit_index + 1) % len(Engel.exit_vector)
        return

    def get_range(self):
        result = []
        for dy, dx in Engel.range_vector:
            y = self.y + dy
            x = self.x + dx
            result.append((y, x))

        return result

    def get_info(self):
        exit_v = ""
        if self.exit_index == 0:
            exit_v = "위"
        elif self.exit_index == 1:
            exit_v = "오른쪽"
        elif self.exit_index == 2:
            exit_v = "아래"
        elif self.exit_index == 3:
            exit_v = "왼쪽"

        return f'{self.y, self.x}, 출구 위치:{exit_v}({self.exit_index}) -> {self.get_exit_pos()}'

    def get_exit_pos(self):
        dy, dx = Engel.exit_vector[self.exit_index]
        exit_y = self.y + dy
        exit_x = self.x + dx
        return exit_y, exit_x


forest = [[0 for _ in range(C)] for _ in range(R)]
engels = []
for _ in range(K):
    c, d = map(int, input().split(" "))
    cur_Engel = Engel(c - 1, d)
    engels.append(cur_Engel)

    if cur_Engel.name == 3:
        pass
    print(f'번호: {cur_Engel.name}')
    print(f"이동 전: {cur_Engel.get_info()}")
    cur_Engel.move()
    print(f"이동 후: {cur_Engel.get_info()}")

    cur_Engel_range = cur_Engel.get_range()

    is_in = True
    for y, x in cur_Engel_range:
        if not (0 <= y < R and 0 <= x < C):
            print("초기화")
            forest = [[0 for _ in range(C)] for _ in range(R)]
            is_in = False
            break
        else:
            forest[y][x] = cur_Engel.name

    for row in forest:
        print(row)

    if not is_in:
        continue

    # 길찾기
    visited = [[False for _ in range(C)] for _ in range(R)]
    queue = deque([(cur_Engel.y, cur_Engel.x, cur_Engel.name)])
    visited[cur_Engel.y][cur_Engel.x] = True
    score = cur_Engel.y + 1
    vectors = [(1, 0), (0, -1), (0, 1), (-1, 0)]

    while queue:
        cur_y, cur_x, cur_name = queue.popleft()

        for dy, dx in vectors:
            next_y = cur_y + dy
            next_x = cur_x + dx

            if not (0 <= next_y < R and 0 <= next_x < C):
                continue

            if forest[next_y][next_x] == 0:
                continue

            next_name = forest[next_y][next_x]

            # 같은 우주선 내부인 경우
            if next_name == cur_name and not visited[next_y][next_x]:
                queue.append((next_y, next_x, next_name))
                visited[next_y][next_x] = True
                score = max(score, next_y + 1)
            # 다른 우주선일 경우, 현재 위치가 출구여야 이동이 가능
            elif next_name != cur_name and not visited[next_y][next_x]:
                if (cur_y, cur_x) == engels[cur_name - 1].get_exit_pos():
                    queue.append((next_y, next_x, next_name))
                    visited[next_y][next_x] = True
                    score = max(score, next_y + 1)

    print(f'획득 점수: {score}')
    answer += score
    print()

print(answer)

print(-5 % 4)
