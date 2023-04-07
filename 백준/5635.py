import sys

sys.stdin = open('data.txt', 'r')

N = int(sys.stdin.readline().rstrip())

persons = []
for i in range(N):
    line = sys.stdin.readline().rstrip().split(" ")
    persons.append(line[:1]+ list(map(int, line[1:])))

persons = sorted(persons, key=lambda data: (data[3], data[2], data[1]))

print(persons[-1][0])
print(persons[0][0])