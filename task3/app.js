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
        fs.access(path.join(__dirname, `./files${req.url}.txt`), fs.constants.F_OK, (err) => {
            if (err) {
                fs.writeFile(path.join(__dirname, `./files${req.url}.txt`), req.body, (err) => {
                    if (err) {
                        console.log(err);
                    }
                    res.send('The file has been saved');
                });
            } else {
                res.send('The file already exist');
            }
        });
    })
    .put((req, res) => {
        fs.access(path.join(__dirname, `./files${req.url}.txt`), fs.constants.F_OK, (err) => {
            if (err) {
                res.send('File does not exist')
            } else {
                fs.appendFile(path.join(__dirname, `./files${req.url}.txt`), `\n${req.body}`, (err) => {
                    if (err) {
                        throw err;
                    } else {
                        res.send(`file has been updated`);
                    }
                });
            }
        });
    })
    .delete((req, res) => {
        fs.access(path.join(__dirname, `./files${req.url}.txt`), fs.constants.F_OK, (err) => {
            if (err) {
                res.send('File does not exist');
            } else {
                fs.unlink(path.join(__dirname, `./files${req.url}.txt`), (err) => {
                    if (err) throw err;
                    res.send(`file has been deleted`);
                });
            }
        });
    });

app.listen('3000', () => console.log('Server is running on port 3000'));