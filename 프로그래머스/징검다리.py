def solution(distance, rocks, n):
    answer = 0

    left = 1
    right = distance

    rocks.sort()
    rocks.append(distance)

    while left <= right:
        mid = (left + right) // 2
        delete_count = 0
        left_rock = 0
        for rock in rocks:
            diff = rock - left_rock
            if diff < mid:
                delete_count += 1
            else:
                left_rock = rock

        if delete_count <= n:
            left = mid + 1
            answer = mid
        elif delete_count > n:
            right = mid - 1

    return answer