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