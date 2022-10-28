require('dotenv').config();

const express = require("express");
const cors = require('cors');
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();

app.use(cors());

//Config JSON response
app.use(express.json());

const httpServer = createServer(app);

const PORT = process.env.PORT || 5000;

const io = new Server(httpServer, {
    cors: {
        origin: `http://localhost:3000`,
    }
});

const { connection } = require('./services/gerencyUsers')


io.on("connection", (socket) => {
    console.log('[SERVER]: New host connected')

    socket.on("ping", (callback) => {
        callback();
    });
});

const users = require('./routes/users');
app.use('/user', users);

const auth = require('./routes/auth');
app.use('/login', auth);

httpServer.listen(PORT, () => {
    console.log(`[SERVER]: Running to port ${PORT}`)
});