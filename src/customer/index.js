'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3004');

// const customerPickUp = require('./customerPickUp');
// const customerPickUp2 = customerPickUp(socket);

const MessageClient = require('../lib/messageClient');
const customer = new MessageClient('customers');

const Chance = require('chance');
let chance = new Chance();


// subscribe 

setInterval(() => {
  console.log('---------------------Client Has Started Their Order, Ready for Pickup-------------------');
  const payload = {
    store: `Kenny G's Saxophone 'n More Store`,
    messageId: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
  };

  console.log('Sending Object: ', payload);
  customer.publish('CUSTOMER', payload );
}, 2000);
