def solution(plans):
    answer = []

    for i in range(len(plans)):
        hour, minute = map(int, plans[i][1].split(":"))
        plans[i][1] = hour * 60 + minute
        plans[i][2] = int(plans[i][2])

    plans.sort(key=lambda plan: -plan[1])
    stack = []  # 이름과 남은시간 저장

    print(plans)

    while len(plans) or len(stack):
        if plans:  # 시작하지 않은 과제가 있는 경우
            name, start, dur = plans.pop()
            if not plans:
                answer.append(name)
                continue
            else:
                next_homework_start = plans[-1][1]

            if start + dur <= next_homework_start:  # 다음 과제 전에 과제를 끝낸 경우
                answer.append(name)
                save_time = next_homework_start - (start + dur)
                while save_time >= 0 and stack:
                    name, remain = stack.pop()
                    if save_time - remain >= 0:
                        answer.append(name)
                        save_time = save_time - remain
                    else:
                        stack.append([name, remain - save_time])
                        break

            else:  # 다음 과제 전에 과제를 끝내지 못한 경우
                stack.append([name, dur - (next_homework_start - start)])
        else:  # 과제 모두 시작해 본 경우
            if stack:  # 덜 끝낸 과제가 있는 경우
                name, remain = stack.pop()
                answer.append(name)
    return answer


print(solution([["science", "12:40", "50"], ["music", "12:20", "40"], ["history", "14:00", "30"], ["computer", "12:30", "100"]]))
