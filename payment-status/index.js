// web socket
const WebSocket = require('ws');
const wss = new WebSocket.Server({port: 9339});

const PAYMENT_STATUS = {
  PENDING_APPROVAL: 'PENDING_APPROVAL',
  APPROVED: 'APPROVED',
  SENT: 'SENT',
  RECEIVED: 'RECEIVED',
};

const connections = [];
let currentStatus = PAYMENT_STATUS.PENDING_APPROVAL;
wss.on('connection', connection => {
  console.log('new websocket connection');
  connections.push(connection);
});

// panel
const panel = require('express')();
const http = require('http').Server(panel);

panel.get('/', (_, response) => {
  response.sendFile(`${__dirname}/panel.html`);
});
panel.post('/approve-invoice', (_, response) => {
  console.log('POST /approve-invoice');
  connections.forEach(connection => {
    (currentStatus = PAYMENT_STATUS.APPROVED), connection.send(currentStatus);
  });
  response.end();
});

const port = 9449;
http.listen(port, () => {
  console.log(`Visit the panel at http://localhost:${port}`);
});
