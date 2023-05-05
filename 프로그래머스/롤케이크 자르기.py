from collections import Counter

def solution(topping):
    answer = 0
    me = Counter(topping)
    bro = {}

    for type in topping:
        me[type] -= 1

        if type in bro:
            bro[type] += 1
        else:
            bro[type] = 1

        if me[type] == 0:
            del me[type]

        if len(me) == len(bro):
            answer += 1

    return answer