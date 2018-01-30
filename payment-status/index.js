// web socket
const WebSocket = require('ws');
const wss = new WebSocket.Server({port: 9339});

wss.on('connection', function connection(ws) {
  console.log('connected');
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});

// panel
const panel = require('express')();
const http = require('http').Server(panel);

panel.get('/', (_, response) => {
  response.sendFile(`${__dirname}/panel.html`);
});

const port = 9449;
http.listen(port, () => {
  console.log(`Visit the panel at http://localhost:${port}`)
})
