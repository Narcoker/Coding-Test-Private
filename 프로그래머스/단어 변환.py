from collections import deque


def search(begin, target, words):
    answer = 0

    queue = deque([(begin, 0)])
    visited = [False] * len(words)

    while queue:
        cur_word, count = queue.popleft()
        for i, next_word in enumerate(words):
            if not visited[i] and can_change(cur_word, next_word):
                visited[i] = True
                queue.append((next_word, count + 1))

                if next_word == target:
                    return count + 1

    return answer


def can_change(cur_word, next_word):
    diff = 0

    for i in range(len(cur_word)):
        if cur_word[i] != next_word[i]:
            diff += 1
        if diff > 1:
            return False

    return True


def solution(begin, target, words):
    answer = 0

    if target in words:
        answer = search(begin, target, words)

    return answer


print(solution("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"]))
