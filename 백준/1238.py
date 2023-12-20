import sys

sys.stdin = open("data.txt", "r")

import heapq

INF = int(1e9)
N, M, X = map(int, sys.stdin.readline().rstrip().split(" "))
graph = {start: {} for start in range(1, N + 1)}
reverse_graph = {start: {} for start in range(1, N + 1)}
for _ in range(M):
    start, end, weight = map(int, sys.stdin.readline().rstrip().split(" "))
    graph[start][end] = weight
    reverse_graph[end][start] = weight


def dijkstra(start, graph):
    distances = {end: INF for end in range(1, N + 1)}
    distances[start] = 0
    heap = [(0, start)]

    while heap:
        cur_distance, cur = heapq.heappop(heap)
        if distances[cur] < cur_distance:
            continue

        for neighbor, weight in graph[cur].items():
            next_distance = cur_distance + weight
            if next_distance < distances[neighbor]:
                distances[neighbor] = next_distance
                heapq.heappush(heap, (next_distance, neighbor))

    return distances


def solution():
    answer = -1
    goHome = dijkstra(X, graph)
    goParty = dijkstra(X, reverse_graph)

    for start in range(1, N + 1):
        answer = max(answer, goHome[start] + goParty[start])
    print(answer)


solution()
