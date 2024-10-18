def solution(N, number):
    answer = -1

    arr = [set() for x in range(9)]

    for i in range(1, 9):
        arr[i].add(int(str(N) * i))

    for target_count in range(1, 9):  # 개수 순회
        for ingredient1 in range(target_count):
            ingredient2 = target_count - ingredient1

            for op1 in arr[ingredient1]:
                for op2 in arr[ingredient2]:
                    arr[target_count].add(op1 + op2)
                    arr[target_count].add(op1 - op2)
                    arr[target_count].add(op1 * op2)

                    if op2 != 0:
                        arr[target_count].add(op1 // op2)

        if number in arr[target_count]:
            answer = target_count
            break

    return answer