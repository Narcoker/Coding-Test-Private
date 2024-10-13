"""
7시 40분 시작
[마법의 숲]
R행 C열
1부터 시작
동,서,남 은 벽이며 북쪽에서 아래로 정령이 들어옴

[골램]
5칸 차지
중앙(정령 탑승)을 제외한 4칸 중 하나는 골렘의 출구
d = 위, 오른쪽, 아래, 왼쪽 0,1,2,3
-이동
이동이 불가능할때 까지 반복
    남쪽으로 한칸 내려감
        남쪽으로 내려갈 수 없는 경우:
            서쪽 방향으로 회전 하강(왼쪽 이동, 아래 이동, 반시계 회전)
            서쪽 방향으로 회전할 수 없는 경우:
                동쪽 방향으로 회전 하강(오른쪽 이동, 아래 이동, 시계 회전)

만약 골렘이 최대한 남쪽으로 이동했지만 골렘의 몸 일부가 여전히 숲을 벗어난 상태면 초기화

[정령]
골렘 내에서 상하좌우 인접한 칸으로 이동
"현재 위치하고 있는 골렘의 출구"가 "다른 골렘과 인접"하고 있다면 해당 출구를 통해 다른 골렘으로 이동 가능
정령은 갈 수 있는 모든 칸 중 가장 남쪽의 칸으로 이동하고 이동을 완전히 종료합니다.
"""
from collections import deque

import sys

sys.stdin = open('input.txt', 'r')


class Golem:
    check = {
        "down": [(1, -1), (2, 0), (1, 1)],
        "left": [(-1, -1), (0, -2), (1, -1)],
        "right": [(-1, 1), (0, 2), (1, 1)]
    }

    def __init__(self, center, exit_direction):
        self.center = center
        self.exit_direction = exit_direction

    def move(self):
        while True:  # while True:
            if self.move_check(Golem.check["down"]):  # 아래로 이동 가능하다면:
                self.move_down()  # 아래로 이동

            else:
                if self.move_check_left_and_down():  # 왼쪽 아래 이동 가능하다면
                    self.move_left()
                    self.move_down()
                    self.rotate_left()
                else:
                    if self.move_check_right_and_down():  # 오른쪽 아래 이동 가능하다면
                        self.move_right()
                        self.move_down()
                        self.rotate_right()
                    else:  # 이동 완전 불가
                        break

        return

    def move_check(self, vectors):
        cur_center_y, cur_center_x = self.center
        for dy, dx in vectors:
            check_y = cur_center_y + dy
            check_x = cur_center_x + dx

            if not (0 <= check_y < R+3 and 0 <= check_x < C):
                return False

            if forest[check_y][check_x] != 0:
                return False

        return True

    def move_check_left_and_down(self):
        cur_y, cur_x = self.center

        if self.move_check(Golem.check["left"]):
            self.move_left()
            if self.move_check(Golem.check["down"]):
                self.center = (cur_y, cur_x)
                return True

        self.center = (cur_y, cur_x)
        return False

    def move_check_right_and_down(self):
        cur_y, cur_x = self.center

        if self.move_check(Golem.check["right"]):
            self.move_right()
            if self.move_check(Golem.check["down"]):
                self.center = (cur_y, cur_x)
                return True

        self.center = (cur_y, cur_x)
        return False

    def move_down(self):
        y, x = self.center
        self.center = (y + 1, x)
        return

    def move_left(self):
        y, x = self.center
        self.center = (y, x - 1)
        return

    def move_right(self):
        y, x = self.center
        self.center = (y, x + 1)
        return

    def rotate_left(self):
        self.exit_direction = (self.exit_direction - 1) % 4
        return

    def rotate_right(self):
        self.exit_direction = (self.exit_direction + 1) % 4
        return

    def get_range(self):
        result = []
        vectors = [(-1, 0), (0, -1), (0, 0), (0, 1), (1, 0)]
        center_y, center_x = self.center
        for dy, dx in vectors:
            result.append((center_y + dy, center_x + dx))
        return result

    def is_in_forest(self):
        for y, x in self.get_range():
            if not (3 <= y < R+3 and 0 <= x < C):
                return False
        return True

    def get_exit_pos(self):
        vectors = [(-1, 0), (0, 1), (1, 0), (0, -1)]  # d = 위, 오른쪽, 아래, 왼쪽 0,1,2,3
        center_y, center_x = self.center
        dy, dx = vectors[self.exit_direction]

        return (center_y + dy, center_x + dx)


def get_point(name):
    result = 0
    vectors = [(1, 0), (0, -1), (0, 1), (-1, 0)]
    stack = deque([(golrems[name - 1].center, name)])
    visited = set()
    visited.add(golrems[name - 1].center)
    while stack:
        (cur_y, cur_x), cur_name = stack.popleft()
        result = max(cur_y + 1 - 3, result)
        for dy, dx in vectors:
            next_y = cur_y + dy
            next_x = cur_x + dx

            if not (0 <= next_y < R+3 and 0 <= next_x < C):  # 숲 밖인 경우
                continue  # 패스

            if forest[next_y][next_x] == 0:  # 우주선이 아닌 경우
                continue

            if (next_y, next_x) in visited:  # 이미 방문한 경우
                continue  # 패스

            if (cur_y, cur_x) == golrems[cur_name - 1].get_exit_pos():  # 현재 위치가 현재 골램의 출구인 경우
                if forest[next_y][next_x] != 0:  # 다음 위치가 우주선 인 경우:
                    stack.append(((next_y, next_x), forest[next_y][next_x]))  # stack.append
                    visited.add((next_y, next_x))  # 방문 체크

            else:  # 현재 위치가 출구가 아닌 경우
                if forest[next_y][next_x] == cur_name:  # 다음 위치가 같은 골램인 경우:
                    stack.append(((next_y, next_x), cur_name))  # stack.append
                    visited.add((next_y, next_x))  # 방문 체크
    return result


R, C, K = map(int, input().split())
forest = [[0 for col in range(C)] for rol in range(R + 3)]  # 골렘 위치 정보
golrems = []
answer = 0
for name in range(K):
    col, exit_direction = map(int, input().split())

    cur_golem = Golem((1, col - 1), exit_direction)
    golrems.append(cur_golem)
    cur_golem.move()

    if not cur_golem.is_in_forest():
        forest = [[0 for col in range(C)] for rol in range(R+3)]

    else:
        for y, x in cur_golem.get_range():
            forest[y][x] = name + 1

        answer += get_point(name + 1)

print(answer)
