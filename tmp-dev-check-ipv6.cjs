const http = require('http');
const urls = ['http://[::1]:5173', 'http://[::1]:5173/src/main.jsx', 'http://[::1]:5173/src/index.css'];
let completed = 0;
urls.forEach(url => {
  http.get(url, res => {
    console.log('URL:', url);
    console.log('status', res.statusCode);
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log('length', data.length);
      if (url.endsWith('/5173')) {
        console.log('root html:\n', data);
        console.log('has root', data.includes('<div id=\"root\">'));
        console.log('has main import', data.includes('src=\"/src/main.jsx\"'));
      }
      if (url.endsWith('/main.jsx')) {
        console.log('main first chars:\n', data.slice(0, 240));
        console.log('main contains css import', data.includes("import './index.css'") || data.includes('import \"./index.css\"'));
      }
      if (url.endsWith('/index.css')) {
        console.log('index.css first chars:\n', data.slice(0, 240));
        console.log('index includes @tailwind', data.includes('@tailwind'));
        console.log('index includes body {', data.includes('body {'));
      }
      console.log('---');
      completed += 1;
      if (completed === urls.length) process.exit(0);
    });
  }).on('error', err => {
    console.error('err', url, err.message);
    completed += 1;
    if (completed === urls.length) process.exit(1);
  });
});
