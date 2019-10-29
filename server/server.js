'use strict';

const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const uuid = require('uuid/v4');
const path = require('path');
const app = express();

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'src')));
app.use(body.json());
app.use(cookie());

const users = {
  'admin@corp.mail.ru': {
    email: 'admin@corp.mail.ru',
    password: 'admin',
    age: 21,
    score: 3,
  },
};

const ids = {};

const layout = [
  [1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11, 12],
  [13, 14, 15, 16, 17],
  [18, 19, 20, 21, 22],
  [23, 24, 25, 26, 27]
];

app.post('/api/signup', function (req, res) {
  const password = req.body.password;
  const email = req.body.email;
  const age = req.body.age;
  if (
    !password || !email || !age ||
    !password.match(/^\S{4,}$/) ||
    !email.match(/@/) ||
    !(typeof age === 'number' && age > 10 && age < 100)
  ) {
    return res.status(400).json({error: 'Не валидные данные пользователя'});
  }
  if (users[email]) {
    return res.status(400).json({error: 'Пользователь уже существует'});
  }

  const id = uuid();
  const user = {password, email, age, score: 0};
  ids[id] = email;
  users[email] = user;

  res.cookie('id', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
  res.status(201).json({id});
});

app.options('/api/signin', function (req, res) {
  console.log(req.headers);
  console.log(req.body);
	res.set('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
	res.set('Access-Control-Allow-Methods', 'POST,PUT');
	res.set('Access-Control-Allow-Headers', 'Content-Type');
	res.set('Access-Control-Allow-Credentials', 'true');
  res.status(204).end();
});

// admin@corp.mail.ru

app.post('/api/signin', function (req, res) {
  console.log(req.headers);
  console.log(req.body);
	res.set('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
	res.set('Access-Control-Allow-Credentials', 'true');
  const password = req.body.password;
  const email = req.body.email;
  if (!password || !email) {
    return res.status(400).json({error: 'Не указан адрес электронной почты или пароль'});
  }
  if (!users[email] || users[email].password !== password) {
    return res.status(400).json({error: 'Не верный адрес электронной почты или пароль'});
  }

  const id = uuid();
  ids[id] = email;

  res.cookie('id', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
  res.status(200).json({id});
});

app.get('/api/profile', function (req, res) {
  console.log(req.headers);
  console.log(req.body);
	res.set('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
	res.set('Access-Control-Allow-Credentials', 'true');
  
  const id = req.cookies.id;
  console.log(id);
  const email = ids[id];
  console.log(email);
  if (!email || !users[email]) {
    return res.status(401).end();
  }
  users[email].score += 1;

  res.json(users[email]);
});

app.get('/api/signout', function (req, res) {
  const id = req.cookies.id;
  const email = ids[id];
  if (!email || !users[email]) {
    return res.status(401).end();
  }
  ids[id] = '';
  res.cookie('id', 'null', {expires: new Date(0)});
  res.status(200).end();
});

app.get('/api/layout', function (req, res) {
  res.json({layout});
});


// app.get('/api/poster', function (req, res) {
  // res.number = 10;
// });

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Сервер слушает порт ${port}`);
});
