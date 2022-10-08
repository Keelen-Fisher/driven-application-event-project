'use strict';

const { Server } = require('socket.io');

const PORT = process.env.PORT || 3004;

const iHub = new Server(PORT);

// Optional for now: create namespace

// creating the queue
const Queue = require('../lib/queue');
const messageQueue = new Queue();

iHub.on('connection', (socket) => {
  console.log('This is connected to the main server', socket.id);

  socket.on('CUSTOMER', (payload) => {
    // enter the queue 
    let currentQueue = messageQueue.read(payload.queueId);
    if (!currentQueue) {
      let queueKey = messageQueue.store(payload.queueId, new Queue());
      currentQueue = messageQueue.read(queueKey);
    }
    currentQueue.store(payload.messageId, payload);
    console.log('This is the order from the customer: ', currentQueue.read(payload.messageId));
    socket.broadcast.emit('NEWCUSTOMER', payload);
  });

  socket.on('IN-TRANSIT', (payload) => {
    console.log('This is the Vendor side, received the order and is in process.');
    // enter the queue
    socket.emit('CONFIRMDELIVERY', payload);
    let currentQueue = messageQueue.read(payload.queueId);
    if (!currentQueue) {
      let queueKey = messageQueue.store(payload.queueId, new Queue());
      currentQueue = messageQueue.read(queueKey);
    }
    currentQueue.store(payload.messageId, payload);
    console.log('This order is in transit: ', currentQueue.read(payload.messageId));
    
    if(!currentQueue){
      throw new Error('no queue created');
    }
    let message = currentQueue.remove(payload.messageId);
    console.log('This has been deleted from the key: TRANSIT', message);
  });

  // delete from the queue/ 2  
  socket.on('DELIVERED', (payload) => {
    console.log('Order confirmed and is ready to be delivered.');
    socket.broadcast.emit('ORDERCONFIRMED');
    // enter the queue
    let currentQueue = messageQueue.read('customers');
    console.log(messageQueue);
    if(!currentQueue){
      throw new Error('no queue created');
    }
    let message = currentQueue.remove(payload.messageId);
    console.log('This has been deleted from the key: DELIVERED', message);
  });

  socket.on('GET_INSTRUMENT', (payload) => {
    console.log('This happened');
    let currentQueue = messageQueue.read(payload.queueId);
    if(currentQueue && currentQueue.data){
      Object.keys(currentQueue.data).forEach(messageId => {
        socket.emit('CUSTOMER', currentQueue.read(messageId));
      });
    }
  });

});
