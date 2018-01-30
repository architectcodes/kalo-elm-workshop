const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', 'http://neverssl.com');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  response.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.get('/', function(request, response){
  response.sendFile(__dirname + '/index.html');
});

io.on('connection', socket => {
  console.log('a user connected');
});

// app.

const port = 9229;
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
})
