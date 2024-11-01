def solution(gems):
    answer = []
    N = len(set([*gems]))
    left = 0
    right = 0

    prev_count = 0
    while left <= right:
        count = len(set([*gems[left:right + 1]]))
        if prev_count < count:
            right += 1

        elif prev_count == count:
            temp_count = len(set([*gems[left + 1:right + 1]]))
            if temp_count == count:
                left += 1
            else:
                right += 1

        if count == N:
            answer = [left+1, right]
            break

        prev_count = count

    return answer

solution(["DIA", "RUBY", "RUBY", "DIA", "DIA", "EMERALD", "SAPPHIRE", "DIA"])