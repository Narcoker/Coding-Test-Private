import sys
from collections import deque

sys.stdin = open("input.txt", 'r')

N, M, K = map(int, sys.stdin.readline().split(" "))
turrets = []


class Turret:
    def __init__(self, y, x, power):
        self.y = y
        self.x = x
        self.power = power
        self.recent_attack_turn = 0
        self.turn_attacked = False

    def set_advantage(self):
        self.power += N + M

    def set_recent_attack_turn(self, turn):
        self.recent_attack_turn = turn

    def set_turn_attacked(self, data):
        self.turn_attacked = data

    def attacted(self, amount, is_target):
        self.power -= amount if is_target else amount // 2
        if self.power < 0:
            self.power = 0

    def attack_laser(self, target, turrets):
        # 상하 좌우 4개의 방향으로 움직일 수 있으며 우/하/좌/상 의 우선 순위를 가진다.
        # 부서진 포탑(공격력 0)이 있는 위치는 지날 수 없다
        # 가장자리에서 막힌 경우는 없다 오픈 월드이다.
        # 공격자와 공격 대상의 최단 거리를 찾고 공격한다.
        # 경로에 있는 포탑들은 공격자의 공격력의 2로 나눈 몫 만큼 데미지를 입는다.

        dy = [0, 1, 0, -1]
        dx = [1, 0, -1, 0]

        queue = deque([])
        visited = [[(-1, -1) for _ in range(M)] for _ in range(N)]  # 방문 안한 경우 (-1,-1), 방문한 경우 부모 위치 저장
        queue.append((self.y, self.x))
        visited[self.y][self.x] = (self.y, self.x)

        while queue:
            cur_y, cur_x = queue.popleft()

            for i in range(len(dy)):
                next_y = (cur_y + dy[i]) % N
                next_x = (cur_x + dx[i]) % M

                if turrets[next_y][next_x].power > 0 and visited[next_y][next_x] == (-1, -1):
                    queue.append((next_y, next_x))
                    visited[next_y][next_x] = (cur_y, cur_x)

                    if next_y == target.y and next_x == target.x:  # 공격자 도달하면 방문 경로 제작
                        root = []
                        root_y, root_x = next_y, next_x
                        root.append((root_y, root_x))
                        while True:
                            parent_y, parent_x = visited[root_y][root_x]

                            if parent_y == root_y and parent_x == root_x:
                                root = root[::-1]

                                # 공격하기
                                target_y, target_x = root[-1]
                                turrets[target_y][target_x].attacted(self.power, True)

                                for root_y, root_x in root[1:-1]:
                                    turrets[root_y][root_x].attacted(self.power, False)

                                for y, x in root:
                                    turrets[y][x].set_turn_attacked(True)

                                return root

                            root.append((parent_y, parent_x))
                            root_y, root_x = visited[root_y][root_x]

        return []

    def attack_bomb(self, target, turrets):
        dy = [-1, -1, -1, 0, 0, 0, 1, 1, 1]
        dx = [-1, 0, 1, -1, 0, 1, -1, 0, 1]
        root = [(self.y, self.x)]

        for i in range(len(dy)):
            next_y = (target.y + dy[i]) % N
            next_x = (target.x + dx[i]) % M

            if turrets[next_y][next_x].power > 0 and (next_y, next_x) != (self.y, self.x):
                if next_y == target.y and next_x == target.x:
                    turrets[next_y][next_x].attacted(self.power, True)
                else:
                    turrets[next_y][next_x].attacted(self.power, False)
                root.append((next_y, next_x))

        for y, x in root:
            turrets[y][x].set_turn_attacked(True)

        return root


def get_attacker(turrets):
    lived_turrets = [turret for row in turrets for turret in row if turret.power > 0]
    attacker = list(sorted(lived_turrets, key=lambda t: (t.power, -t.recent_attack_turn, -(t.y + t.x), -t.x)))[0]
    return attacker


def get_target(turrets, attacker):
    lived_turrets = [turret for row in turrets for turret in row if
                     turret.power > 0 and (attacker.y, attacker.x) != (turret.y, turret.x)]

    if len(lived_turrets) == 0:
        return (-1, -1)

    target = list(sorted(lived_turrets, key=lambda t: (-t.power, t.recent_attack_turn, (t.y + t.x), t.x)))[0]
    return target


for y in range(N):
    powers = list(map(int, sys.stdin.readline().split(" ")))
    row = []
    for x in range(M):
        row.append(Turret(y, x, powers[x]))
    turrets.append(row)

for turn in range(1, K + 1):
    # 공격자 선정
    # 가장 약한 포탑을 찾는다
    # 만약 2개 이상이면 가장 최근에 공격한 포탑이 공격자가 된다.
    # 만약 가장 최근에 공격한 포탑이 2개 이상인 경우 행과 열의 합이 가장 큰 포탑이 공격자가 된다.
    # 만약 행과 열의 합이 가장 큰 포탑이 2개 이상인 경우 열의 합이 가장 큰 포탑이 가장 약한 포탑이 된다.
    attacker = get_attacker(turrets)
    print(f'공격자: {attacker.y, attacker.x}')
    # 공격자는 공격력이 N + M 만큼 증가된다.
    attacker.set_advantage()
    print(f'공격력 증가: {attacker.power - (N+M)} => {attacker.power}')


    # 공격자의 공격
    # 자신을 제외한 가장 강한 포탑
    # 가장 쎈 포탑을 공격한다.
    # 만약 2개 이상이면 공격한지 가장 오래된 포탑이 공격대상이 된다.
    # 공격한지 가장 오래된 포탑이 2개 이상이라면 행과 열의 합이 가장 작은 포탑이 공격대상이 된다.
    # 만약 행과 열의 합이 가장 큰 포탑이 2개 이상인 경우 열 값이 가장 같은 포탑이 공격대상이 된다.
    target = get_target(turrets, attacker)
    print(f'대상자: {target.y, target.x}')


    # 레이저 공격 혹은 포탄 공격을 한다.
    # 레이저 공격을 하지 못할 경우 포탄 공격을 한다.
    root = attacker.attack_laser(target, turrets)

    if not root:
        root = attacker.attack_bomb(target, turrets)
        print(f'포탄 공격 경로: {root}')
    else:
        print(f'레이저 공격 경로: {root}')


    attacker.set_recent_attack_turn(turn)

    # 생존 포탑 확인
    lived_turrets = [turret for row in turrets for turret in row if turret.power > 0]
    if len(lived_turrets) == 1:
        break

    # 포탑 정비
    # 공격자와 공격이 된 대상을 제외하고 살아있는 포탑들의 공격력을 올린다.
    for row in turrets:
        for turret in row:
            if turret.power > 0 and (turret.y, turret.x) not in root:
                turret.power += 1

    print("결과")
    for row in turrets:
        for turret in row:
            print(turret.power, end=" ")
        print()
    print()

lived_turrets_power = [turret.power for row in turrets for turret in row if turret.power > 0]
print(max(lived_turrets_power))
