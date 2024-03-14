def solution(numbers, hand):
    answer = ''
    left_dist = {
        1: {2: 1, 5: 2, 8: 3, 0: 4},
        4: {2: 2, 5: 1, 8: 2, 0: 3},
        7: {2: 3, 5: 2, 8: 1, 0: 2},
        10: {2: 4, 5: 3, 8: 2, 0: 1},
        2: {2: 0, 5: 1, 8: 2, 0: 3},
        5: {2: 1, 5: 0, 8: 1, 0: 2},
        8: {2: 2, 5: 1, 8: 0, 0: 1},
        0: {2: 3, 5: 2, 8: 1, 0: 0},
    }
    right_dist = {
        3: {2: 1, 5: 2, 8: 3, 0: 4},
        6: {2: 2, 5: 1, 8: 2, 0: 3},
        9: {2: 3, 5: 2, 8: 1, 0: 2},
        12: {2: 4, 5: 3, 8: 2, 0: 1},
        2: {2: 0, 5: 1, 8: 2, 0: 3},
        5: {2: 1, 5: 0, 8: 1, 0: 2},
        8: {2: 2, 5: 1, 8: 0, 0: 1},
        0: {2: 3, 5: 2, 8: 1, 0: 0},
    }

    left_pos = 10
    right_pos = 12

    for number in numbers:
        if number == 1 or number == 4 or number == 7:
            answer += "L"
            left_pos = number
        elif number == 3 or number == 6 or number == 9:
            answer += "R"
            right_pos = number
        else:
            if left_dist.get(left_pos).get(number) < right_dist.get(right_pos).get(number):
                answer += "L"
                left_pos = number
            elif left_dist.get(left_pos).get(number) > right_dist.get(right_pos).get(number):
                answer += "R"
                right_pos = number
            else:
                if hand == "left":
                    answer += "L"
                    left_pos = number
                else:
                    answer += "R"
                    right_pos = number

    return answer