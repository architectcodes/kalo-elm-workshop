#! /usr/bin/env node

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
panel.get('/favicon.ico', (_, response) => {
  response.sendFile(`${__dirname}/favicon.ico`);
});


[
  {
    route: '/reset',
    status: PAYMENT_STATUS.PENDING,
  },
  {
    route: '/approve-invoice',
    status: PAYMENT_STATUS.APPROVED,
  },
  {
    route: '/send-payment',
    status: PAYMENT_STATUS.SENT,
  },
  {
    route: '/receive-payment',
    status: PAYMENT_STATUS.RECEIVED,
  },
].forEach(({route, status}) => {
  panel.post(route, (_, response) => {
    console.log(`POST ${route}`);
    connections.forEach(connection => {
      currentStatus = status;
      connection.send(status);
    });
    response.end();
  });
});

const port = 9999;
http.listen(port, () => {
  console.log(`Kalo Pay is running at http://localhost:${port}`);
});
