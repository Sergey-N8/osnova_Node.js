// Напишите HTTP сервер на express и реализуйте два обработчика “/” и “/about”, где:

// — На каждой странице реализован счетчик просмотров
// — Значение счетчика необходимо сохранять в файл каждый раз, когда обновляется страница
// — Также значение счетчика должно загружаться из файла, когда запускается обработчик страницы
// — Таким образом счетчик не должен обнуляться каждый раз, когда перезапускается сервер.


// Подсказка:
// Вы можете сохранять файл в формате JOSN,
// где в объекте ключом будет являться URL страницы, а значением количество просмотров страницы

// Формат сдачи работы:
// — Ссылка на гитхаб/гитлаб
// — Файл с кодом.

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const pathToFile = path.join(__dirname, 'count.json');

const count = {
  main: 0,
  about: 0
};

fs.writeFileSync(pathToFile, JSON.stringify(count, null, 2));

const countRead = JSON.parse(fs.readFileSync(pathToFile, 'utf-8'));

app.get('/', (req, res) => {
  countRead.main += 1;
  fs.writeFileSync(pathToFile, JSON.stringify(countRead, null, 2));
  res.send('<h1>Это main "/"</h1><a href= "/about">Перейти about</a><p>Счетчик main страницы: ' + countRead.main + '</p>')
  count.main;
});
app.get('/about', (req, res) => {
  countRead.about += 1;
  fs.writeFileSync(pathToFile, JSON.stringify(countRead, null, 2));
  res.send('<h1>Это about "/about"</h1><a href= "/">Перейти main</a><p>Счетчик about страницы: ' + countRead.about + '</p>');
});

app.listen(3000);