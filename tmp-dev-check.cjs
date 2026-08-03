const http = require('http');
const req = http.get('http://127.0.0.1:5173', res => {
  console.log('status', res.statusCode);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('---START---');
    console.log(data.slice(0, 500));
    console.log('---END---');
    console.log('has main', data.includes('src="/src/main.jsx"'));
    console.log('has css stylesheet', data.includes('href="/src/index.css"'));
  });
});
req.on('error', err => console.error('err', err.message));
