from functools import reduce
def solution(s):
    answer = 100000

    for unit in range(1, len(s)+1): # 자르는 길이 설정
        key = []
        count = []
        for start in range(0, len(s), unit):
            word = s[start:start+unit]

            if start == 0 or word != key[-1]:
                key.append(word)
                count.append(1)

            elif word == key[-1]:
                count[-1] += 1

        len_key = reduce(lambda acc, value : acc+len(value), key, 0)
        len_count = reduce(lambda acc, value: acc + (len(str(value)) if value != 1 else 0), count, 0)

        answer = min(answer, len_key + len_count)
    return answer