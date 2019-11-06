const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();


app.use(bodyParser.text());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('Hello!');
});

app.route('/:file')
    .get((req, res) => {
        fs.readFile(path.join(__dirname, `./files${req.url}.txt`), 'utf-8', (err, data) => {
            if (err) {
                res.end(`File '${req.url}.txt' does not exist`);
            }
            res.send(data);
        })
    })
    .post((req, res) => {
        if (checkExistence(req.url)) {
            res.send('The file already exist');
        } else {
            fs.writeFile(path.join(__dirname, `./files${req.url}.txt`), req.body, (err) => {
                if (err) {
                    console.log(err);
                }
                res.send('The file has been saved');
            });
        }
    })
    .put((req, res) => {
        if (checkExistence(req.url)) {
            fs.appendFile(path.join(__dirname, `./files${req.url}.txt`), `\n${req.body}`, (err) => {
                if (err) {
                    throw err;
                } else {
                    res.send(`file has been updated`);
                }
            });
        } else {
            res.send('File does not exist')
        }
    })
    .delete((req, res) => {
        if (checkExistence(req.url)) {
            fs.unlink(path.join(__dirname, `./files${req.url}.txt`), (err) => {
                if (err) throw err;
                res.send(`file has been deleted`);
            });

        } else {
            res.send('File does not exist');
        }
    });

function checkExistence(fileName) {
    let result;

    try {
        fs.accessSync(path.join(__dirname, `./files${fileName}.txt`), fs.constants.R_OK | fs.constants.W_OK);
        result = true;
    } catch (err) {
        result = false;
    }

    return result;
}

app.listen('3000', () => console.log('Server is running on port 3000'));