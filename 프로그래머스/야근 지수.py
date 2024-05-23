from collections import defaultdict


def solution(n, works):
    answer = 0
    counter = defaultdict(int)
    for work in works:
        counter[work] += 1


    while n > 0:
        if len(counter.keys()) == 0: break

        work = max(counter.keys())
        next_work = work - 1
        diff = work - next_work
        amount = counter[work]

        if diff * amount <= n:
            counter[next_work] += counter[work]
            del counter[work]
            n -= diff * amount
        else:
            counter[next_work] += n // (diff * amount)
            counter[work] -= n // (diff * amount) + 1 if n % (diff * amount) else 0
            counter[work - n % (diff * amount)] += 1
            n = 0

        if next_work == 0:
            del counter[next_work]


    for work in counter.keys():
        answer += work ** 2 * counter[work]

    print(answer)
    return answer


solution(3, [1, 1])
