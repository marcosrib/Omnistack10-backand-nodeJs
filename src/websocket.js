const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray')
const calculateDistance = require('./utils/calculateDistance')

let io;
const connections = [];

exports.setupWebsocket = (server) => {
    io = socketio(server);
    io.on('connection', socket => {

        const { latitude, longitude, techs } = socket.handshake.query;
        //socket.emit('message', 'helooo')
       connections.push({
           id: socket.id,
           coordinates: {
               latitude: Number(latitude),
               longitude: Number(longitude)
           },
           techs: parseStringAsArray(techs)
       });
    });
}
exports.findConections = (coordinates, techs) => {
   return connections.filter(connection => {
       console.log(techs);
    const t =   connection.techs.some(item => techs.includes(item))
    console.log(t);
       return calculateDistance(coordinates, connection.coordinates) < 10
      // && connection.techs.some(item => techs.includes(item))
   })
}

exports.sendMessage = (to, message, data ) => {
    to.forEach(connection => {
      io.to(connection.id).emit(message, data)
    });
}