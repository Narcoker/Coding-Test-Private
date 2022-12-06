function solution(str1, str2) {
    function count(str, counter) {
        for (let i = 0; i < str.length - 1; i++) {
            let atom = str[i] + str[i + 1];
            let reg = /[A-Z][A-Z]/;
            if (reg.test(atom)) {
                counter.set(atom, counter.get(atom) + 1 || 1);
            }
        }
        return counter;
    }

    function getUnionSize() {
        let size = 0;
        str1Counter.forEach((value, key) => {
            if (str2Counter.has(key)) {
                size += Math.max(value, str2Counter.get(key));
                str2Counter.delete(key);
            } else {
                size += value;
            }
        });

        str2Counter.forEach((value) => {
            size += value;
        });
        return size;
    }

    function getIntersectionSize() {
        let size = 0;
        str1Counter.forEach((value, key) => {
            if (str2Counter.has(key)) {
                size += Math.min(value, str2Counter.get(key));
            }
        });
        return size;
    }

    var answer = 0;
    str1 = str1.toUpperCase();
    str2 = str2.toUpperCase();

    const str1Counter = new Map();
    const str2Counter = new Map();
    count(str1, str1Counter);
    count(str2, str2Counter);

    const intersectionSize = getIntersectionSize();
    const unionSize = getUnionSize();

    answer = !intersectionSize && !unionSize ? 65536 : Math.floor(intersectionSize / unionSize * 65536);

    return answer;
}