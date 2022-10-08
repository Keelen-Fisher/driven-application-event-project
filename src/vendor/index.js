'use strict';

// const { io } = require('socket.io-client');
// const socket = io('http://localhost:3002');
// const confirmPickUp = require('./vendorPickUp');
// const confirmPickUp2 = confirmPickUp(socket);
// const confirmDelivery = require('./vendorDelivered')
const MessageClient = require('../lib/messageClient');
const store = new MessageClient('store');

store.publish('GET_INSTRUMENT', {queueId: 'store'})
store.subscribe('NEWCUSTOMER', (payload) => { 
  setTimeout(() => {
    console.log(`CONFIRM the order for: ${payload.customer}`);
    store.publish('IN-TRANSIT', payload);
  }, 5000); 
});

store.subscribe('CONFIRMDELIVERY', (payload) => {
  setTimeout(() => {
    console.log(`DELIVER the order for: ${payload.customer}`);
    store.publish('DELIVERED', payload);
  }, 6000);
});
