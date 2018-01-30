const {sample, random} = require('lodash');
const server = require('http').createServer((request, response) => {
  // Set CORS headers
  response.setHeader(
    'Access-Control-Allow-Origin',
    request.headers.origin || '*'
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
const io = require('socket.io')(server);

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

const port = 9229;
server.listen(port, () => {
  console.log('Listening on http://localhost:9229');
});
