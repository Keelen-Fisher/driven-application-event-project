'use strict';

const { Server } = require('socket.io');

const PORT = process.env.PORT || 3002;

const iHub = new Server(PORT);

// Optional for now: create namespace

iHub.on('connection', (socket) => {
  console.log('This id connected to the main server', socket.id);
  
  socket.on('CUSTOMER', (payload) => {
    console.log('This is the order from the customer: ', payload);
    socket.emit('NEWCUSTOMER', payload);
    // enter the queue 
  }); 

  socket.on('IN-TRANSIT', (payload) => {
    console.log('This is the Vendor side, received the order and is in process.', payload);
    // enter the queue
  }); 

  socket.on('DELIVERED', (payload) => {
    console.log('This is the Vendor side, order confirmed and is ready to be delivered.', payload);
    socket.emit('ORDERCONFIRMED');
    // enter the queue
  }); 

});



