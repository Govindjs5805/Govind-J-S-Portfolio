const https = require('https');
const urls = [
  'https://govind-portfolio-delta.vercel.app/assets/index-DV0r1Gnd.js',
  'https://govind-j-s.vercel.app/assets/index-7dw0QTm6.css'
];
let completed = 0;
urls.forEach(url => {
  https.get(url, res => {
    console.log('URL:', url);
    console.log('status', res.statusCode);
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log('length', data.length);
      console.log('first chars:', data.slice(0, 120));
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
