import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { tracks } from './public/data/tracks.js';
import { drivers } from './public/data/drivers.js';
import { teams } from './public/data/teams.js';

const PORT = process.env.PORT || 3000;

const getContentType = (filePath) => {
  const extname = path.extname(filePath);

  const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.ico': 'image/x-icon',
  };

  return mimeTypes[extname] || 'application/octet-stream';
}

const server = http.createServer((req, res) => {
  let filePath;

  console.log(req.url);

  //Here we are loading different assets and all pages
  if(req.url.includes('/assets') || req.url.includes('/data')) {
    filePath = req.url;
  }
  else {
    switch(true) {
      case req.url === '/index':
      case req.url === '/':
        filePath = '/pages/index/index.html';
        break;
      case req.url === '/standings/drivers':
        filePath = '/pages/standings/drivers.html';
        break;
      case req.url.startsWith('/drivers/'):
        const driverId = req.url.split('/').pop();
        (drivers.some(driver => driver.id === Number(driverId)) && !isNaN(driverId))
          ?  filePath = '/pages/driver/driver.html' : filePath = '/pages/404.html';
        break;
      case req.url === '/standings/constructors':
        filePath = '/pages/standings/constructors.html';
        break;
      case req.url.startsWith('/constructors/'):
        const constructorId = req.url.split('/').pop();
        (teams.some(team => team.id === Number(constructorId)) && !isNaN(constructorId))
          ?  filePath = '/pages/constructor/constructor.html' : filePath = '/pages/404.html';
        break;
      case req.url === '/schedule':
        filePath = '/pages/schedule/schedule.html';
        break;
      case req.url === '/tracks':
        filePath = '/pages/tracks/tracks.html';
        break;
      case req.url.startsWith('/tracks/'):
        const trackId = req.url.split('/').pop();
        (tracks.some(track => track.id === Number(trackId)) && !isNaN(trackId))
          ?  filePath = '/pages/tracks/track.html' : filePath = '/pages/404.html';
        break;
      default:
        filePath = '/pages/404.html';
    }
  }

  console.log(filePath);
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  filePath = path.join(__dirname, 'public', filePath);

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
