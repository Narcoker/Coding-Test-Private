import sys
import heapq

sys.stdin = open("data.txt", 'r')
INF = int(1e9)


def dijkstra(y, x, graph):
    N = len(graph[0])
    distances = [[INF] * N for _ in range(N)]
    distances[0][0] = graph[0][0]

    heap = [(graph[0][0], 0, 0)]
    dy = [-1, 1, 0, 0]
    dx = [0, 0, -1, 1]

    while heap:
        cur_distance, cur_y, cur_x = heapq.heappop(heap)
        if cur_distance > distances[cur_y][cur_x]:
            continue

        for i in range(4):
            ny = cur_y + dy[i]
            nx = cur_x + dx[i]
            if 0 <= ny < N and 0 <= nx < N:
                next_distance = cur_distance + graph[ny][nx]

                if next_distance < distances[ny][nx]:
                    distances[ny][nx] = next_distance
                    heapq.heappush(heap, (next_distance, ny, nx))

    return distances


def solution():
    count = 1
    while True:
        N = int(sys.stdin.readline())
        if N == 0:
            break

        graph = []
        for _ in range(N):
            graph.append(list(map(int, sys.stdin.readline().split(" "))))
        distances = dijkstra(0, 0, graph)
        print(f'Problem {count}: {distances[N-1][N-1]}')
        count += 1
    return

solution()