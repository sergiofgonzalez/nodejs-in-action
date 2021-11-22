import express from 'express';
import path from 'path';

const PORT = process.env.PORT || 5000;
const app = express();


// No CORS endpoint to retrieve a resource
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'data', 'message.json'));
});


// CORS-enabled endpoint to retrieve a resource
app.get('/allow-cors', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.sendFile(path.join(__dirname, 'data', 'message.json'));
});

export const server = app.listen(PORT, () => {
  console.log(`SERVER: listening on port ${ PORT }`);
});