const {sample, random} = require('lodash');
const server = require('http').createServer((request, response) => {
  // Set CORS headers
  console.log('request', request)
  response.setHeader(
    'Access-Control-Allow-Origin',
    'http://neverssl.com'
  );
  response.setHeader('Access-Control-Request-Method', '*');
  response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  response.setHeader(
    'Access-Control-Allow-Headers',
    'authorization, content-type'
  );
  if (request.method === 'OPTIONS') {
    response.writeHead(200);
    response.end();
    return;
  }
});

const io = require('socket.io')(server, {
  origins: 'neverssl.com:80'
});

io.on('connection', client => {
  console.log('someone connected');
  client.on('event', data => {});
  client.on('disconnect', () => {});
});

function updateStatus() {
  io.emit(
    'payment status',
    `"${sample([
      'processing',
      'further processing',
      'more processing',
      'looking for the money',
    ])}"`
  );
  setTimeout(updateStatus, random(1000, 10000));
}
updateStatus();

const port = 9339;
server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
