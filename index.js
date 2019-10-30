function reverseString(str) {
    return str.split('').reverse().join('');
}

function replaceSubStr(initialStr, subStr, newSubStr) {
    let reg = new RegExp(subStr, 'gi');
    return initialStr.replace(reg, newSubStr);
}

