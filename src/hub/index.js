'use strict';

const { Server } = require('socket.io');

const PORT = process.env.PORT || 3002;

const iHub = new Server(PORT);

// Optional for now: create namespace

iHub.on('connection', (socket) => {
  console.log('This id connected to the main server', socket.id);

});

