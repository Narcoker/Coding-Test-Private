def solution(storey):
    answer = 0

    while storey:
        num = storey % 10

        if num < 5:
            answer += num
        elif num == 5:
            next_num = storey // 10 % 10
            if next_num + 1 > 5:
                storey += 10
                answer += num

            else:
                answer += 10 - num


        else:
            storey += 10
            answer += 10 - num

        storey = storey // 10


    return answer

print(solution(485))

