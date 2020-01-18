const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const { setupWebsocket } = require('./websocket');

mongoose.connect('mongodb+srv://root:admin@cluster0-e4q6l.mongodb.net/omnistack10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const app = express();
const server = http.Server(app);
setupWebsocket(server);
app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333)