// Напишите HTTP сервер и реализуйте два обработчика, где:
// — По URL “/” будет возвращаться страница, на которой есть гиперссылка на вторую страницу по ссылке “/about”
// — А по URL “/about” будет возвращаться страница, на которой есть гиперссылка на первую страницу “/”
// — Также реализуйте обработку несуществующих роутов (404).
// — * На каждой странице реализуйте счетчик просмотров. Значение счетчика должно увеличиваться 
// на единицу каждый раз, когда загружается страница.

const http = require('http');

const count = {
  main: 0,
  about: 0,
  error: 0,

  get() {
    console.log(`count main = ${this.main}, count about = ${this.about}, count error = ${this.error}`);
  },
};

const server = http.createServer((req, res) => {
  // res.writeHead(200, {
  //     'Content-Type' : 'text/html; charset=utf-8'
  // });
  // res.end('<h1>Да</h1>');

  if (req.url == "/") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end('<a href="/about">Гиперссылка на вторую страницу по ссылке “/about”</a>');
    count.main += 1;
    count.get();
  } else if (req.url == "/about") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end('<a href="/">Гиперссылка на первую страницу</a>');
    count.about += 1;
    count.get();
  } else {
    res.writeHead(404, { "Content-Type": "application/json;" });
    res.end('<h1>Страница 404</h1>');
    count.error += 1;
    count.get();
  }
});

const port = '3000';

server.listen(port);



/*
const http = require("http");
const fs = require("fs");
const HOSTNAME = "127.0.0.1";
const PORT = 3000;
const server = http.createServer((req, res) => {
  //обработка главной
  if (req.url == "/") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    fs.createReadStream("./pages/index.html").pipe(res);
  } else if (req.url == "/about") {
    //обработка страницы о нас
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    fs.createReadStream("./pages/about.html").pipe(res);
  } else if (req.url == "/api/metrics") {
    //апи запрос на метрику
    res.writeHead(200, { "Content-Type": "application/json;" });
    fs.createReadStream("./metrics.json").pipe(res);
  } else if (req.url == "/api/metrics-write") {
    //апи запрос на запись метрики
    res.writeHead(200, { "Content-Type": "application/json;" });

    req.on("data", function (data) {
      const dataToWrite = JSON.stringify(JSON.parse(data));
      fs.writeFileSync("metrics.json", dataToWrite);
    });
  } else if (req.url == "/api/jsrequest") {
    //попытка в подключение ЖС файла
    res.writeHead(200, { "Content-Type": "text/javascript; charset=utf-8" });
    fs.createReadStream("./metrics.js").pipe(res);
  } else {
    //обработка ошибочных роутов
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    fs.createReadStream("./pages/error.html").pipe(res);
  }
});
server.listen(PORT, HOSTNAME, () => {
  console.log(`Сервер запущен:   http://${HOSTNAME}:${PORT}`);
});

*/