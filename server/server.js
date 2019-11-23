
'use strict';

const express = require('express');
const path = require('path');

const PORT = 3000;
const PUBLIC = 'src';
const INDEX = 'index.html';
const CHAT = 'chat.html';

const publicDirname = path.resolve(__dirname, '..', `${PUBLIC}`);
const indexPath = path.resolve(__dirname, '..', `${PUBLIC}/${INDEX}`);
const chatPath = path.resolve(__dirname, '..', `${PUBLIC}/${CHAT}`);

const app = express();

app.use(express.static(publicDirname));

app.get('/', (req, res) => {
    res.sendFile(indexPath, (err) => {
        res.statusCode = 404;
        res.send(err);
    });
});

app.get('/chat', (req, res) => {
    res.sendFile(chatPath, (err) => {
        res.statusCode = 404;
        res.send(err);
    });
});

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});
