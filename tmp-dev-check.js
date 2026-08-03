const http = require('http');
http.get('http://127.0.0.1:5173', res => {
  console.log('status', res.statusCode);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('---START---');
    console.log(data.slice(0, 400));
    console.log('---END---');
    console.log('has main', data.includes('src="/src/main.jsx"'));
    console.log('has css import', data.includes('href="/src/index.css"'));
  });
}).on('error', err => console.error('err', err.message));
