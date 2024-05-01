// Урок 8. Семинар: Создание REST API с Express
// Для того, чтобы пользователи хранились постоянно, а не только, когда запущен сервер, необходимо реализовать 
// хранение массива в файле.

// Подсказки:
// — В обработчиках получения данных по пользователю нужно читать файл
// — В обработчиках создания, обновления и удаления нужно файл читать, чтобы убедиться, что пользователь существует, 
// а затем сохранить в файл, когда внесены изменения
// — Не забывайте про JSON.parse() и JSON.stringify() - эти функции помогут вам переводить объект в строку и наоборот.

// *Формат сдачи работы: *
// Ссылка на гитхаб/гитлаб
// Файл с кодом.

const express = require('express');
const joi = require('joi');
const fs = require('fs');
const path = require('path');

const pathToFile = path.join(__dirname, 'users.json');

const app = express();

let uniqueId = 0;

const userScheme = joi.object({
    firstName: joi.string().min(1).required(),
    secondName: joi.string().min(1).required(),
    age: joi.number().min(0).max(150).required(),
    city: joi.string().min(1)
});

app.use(express.json());

app.get('/users', (req, res) => {
    const usersJson = JSON.parse(fs.readFileSync(pathToFile, 'utf-8'));
    res.send({ usersJson });
});

app.get('/users/:id', (req, res) => {
    const userId = +req.params.id;
    const usersJson = JSON.parse(fs.readFileSync(pathToFile, 'utf-8'));
    const user = usersJson.find(user => user.id === userId);
    if (user) {
        res.send({ user });
    } else {
        res.status(404);
        res.send({ user: null });
    }
});

app.post('/users', (req, res) => {
    const usersJson = JSON.parse(fs.readFileSync(pathToFile, 'utf-8'));
    if (usersJson.length !== 0) {
        uniqueId = usersJson[usersJson.length - 1].id + 1;
    } else {
        uniqueId = 1;
    };
    usersJson.push({
        id: uniqueId,
        ...req.body
    })
    fs.writeFileSync(pathToFile, JSON.stringify(usersJson, null, 2));
    res.send({ id: uniqueId });
});

app.put('/users/:id', (req, res) => {
    const result = userScheme.validate(req.body);
    if (result.error) {
        return res.status(404).send({ error: result.error.details });
    }
    const userId = +req.params.id;
    const usersJson = JSON.parse(fs.readFileSync(pathToFile, 'utf-8'));
    const user = usersJson.find(user => user.id === userId);
    if (user) {
        const { firstName, secondName, age, city } = req.body;
        user.firstName = firstName;
        user.secondName = secondName;
        user.age = age;
        user.city = city;
        fs.writeFileSync(pathToFile, JSON.stringify(usersJson, null, 2));
        res.send({ user });
    } else {
        res.status(404);
        res.send({ user: null });
    }
});

app.delete('/users/:id', (req, res) => {
    const userId = +req.params.id;
    const usersJson = JSON.parse(fs.readFileSync(pathToFile, 'utf-8'));
    const user = usersJson.find(user => user.id === userId);
    if (user) {
        const userIndex = usersJson.indexOf(user);
        usersJson.splice(userIndex, 1);
        fs.writeFileSync(pathToFile, JSON.stringify(usersJson, null, 2));
        res.send({ user });
    } else {
        res.status(404);
        res.send({ user: null });
    }
});

app.delete('/users', (req, res) => {
    usersClear = [];
    fs.writeFileSync(pathToFile, JSON.stringify(usersClear, null, 2));
    console.log("users.json is clear");
    res.send( "users.json is clear" );
});

app.listen(3000);