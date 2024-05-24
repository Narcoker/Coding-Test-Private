import sys

sys.setrecursionlimit(1000000)

answer = 0


class Node:
    def __init__(self, amount):
        self.amount = amount
        self.neighbors = set([])

    def __str__(self):
        return f'amount:{self.amount}, neighbors: {self.neighbors}'


def travel(cur, parent, nodes, visited):
    global answer
    visited[cur] = True

    for neighbor in nodes[cur].neighbors:
        if not visited[neighbor]:
            travel(neighbor, cur, nodes, visited)

    if parent != -1:
        answer += abs(nodes[cur].amount)

        nodes[parent].amount += nodes[cur].amount
        nodes[cur].amount -= nodes[cur].amount


def solution(a, edges):
    global answer
    answer = 0

    if all([num == 0 for num in a]):
        return 0

    if sum(a) != 0:
        return -1

    visited = [False for _ in range(len(a))]
    nodes = [Node(amount) for amount in a]

    for node1, node2 in edges:
        nodes[node1].neighbors.add(node2)
        nodes[node2].neighbors.add(node1)

    travel(0, -1, nodes, visited)

    return answer

