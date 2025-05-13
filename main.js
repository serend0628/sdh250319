var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

function templateHTML(title, list, body, control) {
  return `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="/style.css">
  </head>
  <body>
    <main>
      <div class="background">
        <h1 class="title"><a href="/">게시판</a></h1>
        <div class="topBox">${list}
        ${control}
        ${body}
      </div>
    </main>
  </body>
  </html>
  `;
}

function templateList(filelist) {
  var list = '<ul class="list">';
  var i = 0;
  while (i < filelist.length) {
    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i = i + 1;
  }
  list = list + '</ul>';
  return list;
}

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;

  if (pathname === '/') {
    if (queryData.id === undefined) {
      fs.readdir('./data', function (error, filelist) {
        var title = 'Welcome';
        var description = 'Hello, Node.js';
        var list = templateList(filelist);
        var template = templateHTML(title, list,
          `<h2 id="welcome">${title}</h2>${description}`,
          `<div class="modify"><a href="/create">create</a></div>`
          // first screen
        );
        response.writeHead(200);
        response.end(template);
      });
    } else {
      fs.readdir('./data', function (error, filelist) {
        fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
          var title = queryData.id;
          var list = templateList(filelist);
          var template = templateHTML(title, list,
            `<div class="descrip">
              <h2>${title}</h2>
              ${description}
            </div>`,
            `<form class="modify" action="/delete_process" method="post" onsubmit="return confirm('really?');">
                <input type="hidden" name="id" value="${title}">
                <input class="delete" type="submit" value="delete">
                <a href="/create">create</a>
                <a href="/update?id=${title}">update</a>
             </form></div>`
          );
          response.writeHead(200);
          response.end(template);
        });
      });
    }
  } else if (pathname === '/style.css') {
    fs.readFile('style.css', function (err, data) {
      if (err) {
        response.writeHead(404);
        response.end('Not found');
      } else {
        response.writeHead(200, { 'Content-Type': 'text/css' });
        response.end(data);
      }
    });
  } else if (pathname === '/create') {
    fs.readdir('./data', function (error, filelist) {
      var title = 'WEB - create';
      var list = templateList(filelist);
      var template = templateHTML(title, list, `
          <form action="/create_process" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p><textarea name="description" placeholder="description"></textarea></p>
            <p><input type="submit"></p>
          </form>`, '');
      response.writeHead(200);
      response.end(template);
    });
  } else if (pathname === '/create_process') {
    var body = '';
    request.on('data', function (data) {
      body += data;
    });
    request.on('end', function () {
      var post = qs.parse(body);
      var title = post.title;
      var description = post.description;
      fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
        response.writeHead(302, { Location: `/?id=${title}` });
        response.end();
      });
    });
  } else if (pathname === '/update') {
    fs.readdir('./data', function (error, filelist) {
      fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
        var title = queryData.id;
        var list = templateList(filelist);
        var template = templateHTML(title, list, `
          <form action="/update_process" method="post">
            <input type="hidden" name="id" value="${title}">
            <p><input type="text" name="title" value="${title}"></p>
            <p><textarea name="description">${description}</textarea></p>
            <p><input type="submit"></p>
          </form>
        `, `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`);
        response.writeHead(200);
        response.end(template);
      });
    });
  } else if (pathname === '/update_process') {
    var body = '';
    request.on('data', function (data) {
      body += data;
    });
    request.on('end', function () {
      var post = qs.parse(body);
      var id = post.id;
      var title = post.title;
      var description = post.description;
      fs.rename(`data/${id}`, `data/${title}`, function (error) {
        fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
          response.writeHead(302, { Location: `/?id=${title}` });
          response.end();
        });
      });
    });
  } else if (pathname === '/delete_process') {
    var body = '';
    request.on('data', function (data) {
      body += data;
    });
    request.on('end', function () {
      var post = qs.parse(body);
      var id = post.id;
      fs.unlink(`data/${id}`, function (error) {
        response.writeHead(302, { Location: `/` });
        response.end();
      });
    });
  } else {
    response.writeHead(404);
    response.end('Not found');
  }
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
