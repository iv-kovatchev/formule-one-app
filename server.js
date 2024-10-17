const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const getContentType = (filePath) => {
  const extname = path.extname(filePath);

  const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
  };

  return mimeTypes[extname] || 'application/octet-stream';
}

const server = http.createServer((req, res) => {
  let filePath;

  console.log('req.url');

  switch(req.url) {
    case '/index':
    case '/':
      filePath = '/pages/index/index.html';
      break;
    case '/standings':
      filePath = '/pages/standings/standings.html';
      break;
    case '/schedule':
      filePath = '/pages/schedule/schedule.html';
      break;
    case '/tracks':
      filePath = '/pages/tracks/tracks.html';
      break;
    default:
      filePath = '/pages/404.html';
  }

  filePath = path.join(__dirname, 'public', filePath);

  console.log(filePath);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        fs.readFile(path.join(__dirname, 'public', '404.html'), (err404, content404) => {
          res.writeHead(404, {'content-type': 'text/html'});

          if(!err404)  {
            res.end(content404, 'utf-8');
          } else {
            res.end('<h1>404 - Page Not Found</h1>', 'utf-8');
          }
        });
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    }
    else {
      res.writeHead(200, { 'Content-Type': getContentType(filePath) });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
