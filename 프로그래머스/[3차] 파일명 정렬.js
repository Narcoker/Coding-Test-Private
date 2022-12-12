function solution(files) {
    files.sort((file1, file2) => {
        let [temp1, file1_HEAD, file1_NUMBER] = file1.match(/(\D*)([0-9]*)/i);
        let [temp2, file2_HEAD, file2_NUMBER] = file2.match(/(\D*)([0-9]*)/i);
        file1_HEAD = file1_HEAD.toUpperCase();
        file2_HEAD = file2_HEAD.toUpperCase();

        if (file1_HEAD < file2_HEAD) return -1;
        if (file1_HEAD > file2_HEAD) return 1;
        return file1_NUMBER - file2_NUMBER;
    });

    return files;
}