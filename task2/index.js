const fs = require('fs');
const path = require('path');

const absolutePath = path.resolve('./test.txt');
const timestamp = new Date();

fs.writeFile(path.join(__dirname, './test.txt'), `${absolutePath}\n${timestamp}`, (err) => {
    if (err) {
        console.log(err);
    }

    console.log('The file was saved');
});