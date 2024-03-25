# L : 체스판 크기 LxL
# N : 기사 수 (y, x, 세로, 가로, 체력)
# Q : 명령 수 (i,d) : i 번 기사에게 방향 d로 이동 (0,1,2,3) : 위, 오른쪽, 아래, 왼쪽

import sys

sys.stdin = open('input.txt', 'r')


class Knight:
    def __init__(self, name, y, x, h, w, hp):
        self.name = name
        self.y = y
        self.x = x
        self.h = h
        self.w = w
        self.hp = hp
        self.history = 0

    def get_range(self, y, x):
        result = []
        for width in range(self.w):
            for height in range(self.h):
                result.append((y + height, x + width))
        return result

    def get_damage(self, amount):
        prev_hp = self.hp
        self.hp = self.hp - amount if self.hp - amount > 0 else 0
        print(f'기사 {self.name}: 데미지 {amount if self.hp > 0 else prev_hp}')
        self.history += amount if self.hp > 0 else prev_hp
        return amount if self.hp > 0 else prev_hp

    def check(self, d, order):
        next_y, next_x = self.y, self.x

        print( f"{self.name} 님이 이동합니다")
        if d == 0:  # 위
            print("위로 이동")
            next_y = self.y - 1
        elif d == 1:  # 오른쪽
            print("오른쪽로 이동")
            next_x = self.x + 1
        elif d == 2:  # 아래
            print("아래로 이동")
            next_y = self.y + 1
        elif d == 3:  # 왼쪽
            print("왼쪽으로 이동")
            next_x = self.x - 1

        knight_range = self.get_range(next_y, next_x)
        #벽이 있는지 확인
        if set(knight_range) & set(walls):
            print("이동 실패")
            return []
        for y, x in knight_range:
            if not 1 <= y <= L or not 1 <= x <= L:
                print("이동 실패")
                return []


        #이동 위치에 기사가 있는지 확인
        visited = set([self.name])
        for y, x in knight_range:
            if  knights_board[y][x] != 0 and knights_board[y][x] != self.name and knights_board[y][x] not in visited and knights[knights_board[y][x]].hp > 0:
                result = knights[knights_board[y][x]].check(d, order)
                if not result:
                    print("이동 실패")
                    return []
                visited.add(knights_board[y][x])

        order.append(self.name)
        return order

    def move(self, d, order, attacker):
        for name in order:
            prev_range = knights[name].get_range(knights[name].y, knights[name].x)

            next_y, next_x = knights[name].y, knights[name].x

            if d == 0:  # 위
                next_y = knights[name].y - 1
            elif d == 1:  # 오른쪽
                next_x = knights[name].x + 1
            elif d == 2:  # 아래
                next_y = knights[name].y + 1
            elif d == 3:  # 왼쪽
                next_x = knights[name].x - 1

            knights[name].y, knights[name].x = next_y, next_x

            knight_range = knights[name].get_range(next_y, next_x)

            for y, x in knight_range:
                knights_board[y][x] = name

            for y, x in set(prev_range) - set(knight_range):
                knights_board[y][x] = 0

            # 체력 감소
            bomb_count = len(set(bombs) & set(knight_range))
            if name != attacker:
                knights[name].get_damage(bomb_count)


            print(f'{name} 이동전 범위 : {prev_range}')
            print(f'{name} 이동후 범위 : {knight_range}')

            print(f'{name} 이동 종료')
        return True


L, N, Q = map(int, sys.stdin.readline().split(" "))
board = [[0] * (L + 1)] + [[0] + list(map(int, sys.stdin.readline().split(" "))) for _ in range(L)]
bombs = []
walls = []
for row in range(1, L + 1):
    for col in range(1, L + 1):
        if board[row][col] == 1:
            bombs.append((row, col))
        elif board[row][col] == 2:
            walls.append((row, col))

knights_board = [[0 for _ in range(L + 1)] for _ in range(L + 1)]
knights = [Knight(0, 0, 0, 0, 0, 0)]
for i in range(1, N + 1):
    y, x, h, w, hp = map(int, sys.stdin.readline().split(" "))
    knight = Knight(i, y, x, h, w, hp)
    knights.append(knight)
    for y, x in knight.get_range(knight.y, knight.x):
        knights_board[y][x] = i

for row in knights_board[1:]:
    print(row[1:])

for q in range(Q):
    i, d = map(int, sys.stdin.readline().split(" "))
    if knights[i].hp > 0:
        order = knights[i].check(d, [])
        if order:
            knights[i].move(d, order, i)
            print(f'이동순서: {order}')
    print()
    print("결과")
    for row in knights_board[1:]:
        print(row[1:])
    for knight in knights[1:]:
        print(knight.name, " -->", knight.hp)
    print(f"{q + 1}턴종료------------------")
    print()

answer = 0
for knight in knights:
    if knight.hp > 0:
        print(knight.name, knight.history)
        answer += knight.history
print(answer)
