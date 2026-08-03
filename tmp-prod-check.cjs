const https = require('https');
const urls = [
  'https://govind-portfolio-owuqh06u1-govind-j-ss-projects.vercel.app',
  'https://govind-portfolio-delta.vercel.app'
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
      console.log('first chunk:\n', data.slice(0, 400));
      console.log('includes root', data.includes('<div id="root">'));
      console.log('includes main', data.includes('src="/src/main.jsx"') || data.includes('src=\"/src/main.jsx\"'));
      console.log('includes vite client', data.includes('/@vite/client'));
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
