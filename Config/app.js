const express = require('express');
const multer = require('multer')
require('dotenv').config();

global.Env = process.env;

const app = express();
const cors = require('cors')
app.use(cors());
app.use((req, res, next) => {
  // console.log(`request at ${new Date()}`);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const http = require('http').Server(app);

//socketIo
const io = require('socket.io')(http, {
  pingTimeout: 30000,
  pingInterval: 60000
});
const Socket = require('../App/Controllers/WS/SocketController');
Socket.SocketController(io);


http.listen(Env.PORT, () => {
  console.log(`Server run at port: ${Env.PORT}`);
});


module.exports = app;