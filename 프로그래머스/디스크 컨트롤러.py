import heapq
import math


def solution(jobs):
    answer = 0
    jobs.sort(key = lambda job: -job[0])# 잡스 들어온 순 역순으로 정렬
    readyQueue = [] # 레디 큐
    cur_time = 0 # 현재 시간
    turn_arround_times = [] # 누적 턴어라운드 타임


    while jobs or readyQueue: # 잡큐와 레이큐가 모두 비어 있지 않다면:
        next_time = cur_time # next_time = cur_time

        for i in range(len(jobs)-1, -1, -1):# jobs 역순회:
            startTime, burstTime = jobs[i]
            if startTime <= cur_time: # 시작 시간이 현재 시간 보다 작거나 같으면
                heapq.heappush(readyQueue, (burstTime, startTime)) # 레디 큐에 큐푸시(걸리는 시간, 시작 시간)
                jobs.pop() # job.pop()
            else: # 그렇지 않다면:
                next_time = startTime # next_time = 시작 시간
                break

        if readyQueue: # 레디 큐에 있다면
            burstTime, startTime = heapq.heappop(readyQueue)# 걸리는 시간, 시작 시간 = readyQeueu 큐 팝
            cur_time += burstTime # 현재시간 += 걸리는 시간
            turn_arround_times.append(cur_time - startTime)# 누적 턴어라운드 타임.append(현재 시간 - 시작 시간)

        else: # 그렇지 않다면:
            cur_time = next_time # cur_time = next_time
    print(turn_arround_times)
    return math.floor(sum(turn_arround_times) / len(turn_arround_times))


print(solution([[0, 3], [1, 9], [0,3], [2, 6]]))
