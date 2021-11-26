import http from 'http';

http.createServer((req, res) => {
  console.log(`A request has been received!`);
  res.write('Hello, stranger!');
  res.end();
}).listen(5000, () => {
  console.log(`HTTP server running on port 5000`);
});