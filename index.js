function reverseString(str) {
    return str.split('').reverse().join('');
}

function replaceSubStr(initialStr, subStr, newSubStr) {
    let reg = new RegExp(subStr, 'gi');
    return initialStr.replace(reg, newSubStr);
}

function showObjectValues(obj) {
    let result = [];

    getValue(obj);

    function getValue(obj) {
        for (let key in obj) {
            if (typeof (obj[key]) === 'object') {
                getValue(obj[key]);
            } else {
                result.push(obj[key])
            }
        }
    }

    console.log(result);
}