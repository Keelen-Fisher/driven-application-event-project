'use strict';

const { Server } = require('socket.io');

const PORT = process.env.PORT || 3002;

const iHub = new Server(PORT);

// Optional for now: create namespace

// creating the queue
const Queue = require('../lib/queue');
const messageQueue = new Queue();

iHub.on('connection', (socket) => {
  console.log('This id connected to the main server', socket.id);

  socket.on('CUSTOMER', (payload) => {
    console.log('This is the order from the customer: ', payload);
    socket.broadcast.emit('NEWCUSTOMER', payload);
    // enter the queue 
  });

  socket.on('IN-TRANSIT', (payload) => {
    console.log('This is the Vendor side, received the order and is in process.');
    // enter the queue
  });

  // delete from the queue/ 2  
  socket.on('DELIVERED', (payload) => {
    console.log('Order confirmed and is ready to be delivered.');
    socket.broadcast.emit('ORDERCONFIRMED');
    // enter the queue
  });



  //   socket.on('RECEIVED', (payload) => {
  //     let currentQueue = messageQueue.read(payload.queueId);
  //   });

});
