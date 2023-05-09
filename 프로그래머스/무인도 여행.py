from collections import deque


def solution(maps):
    answer = []
    col = len(maps[0])
    row = len(maps)
    visited = [[False] * col for _ in range(row)]
    dq = deque([])

    def bfs(y, x, row, col):
        dy = [0, 0, -1, 1]
        dx = [-1, 1, 0, 0]
        sum = 0
        queue = deque([(y, x)])
        visited[y][x] = True

        while queue:
            cur_y, cur_x = queue.popleft()
            sum += int(maps[cur_y][cur_x])
            for i in range(4):
                next_y = cur_y + dy[i]
                next_x = cur_x + dx[i]

                if 0 <= next_y < row and 0 <= next_x < col and maps[next_y][next_x] != "X" and not visited[next_y][
                    next_x]:
                    queue.append((next_y, next_x))
                    visited[next_y][next_x] = True

        answer.append(sum)

    for y in range(row):
        for x in range(col):
            if maps[y][x] != "X" and not visited[y][x]:
                bfs(y, x, row, col)

    return sorted(answer) if len(answer) else [-1]