'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3002');

const customerPickUp = require('./customerPickUp');
const customerPickUp2 = customerPickUp(socket);

const Chance = require('chance');
let chance = new Chance();

setInterval(() => {
  console.log('---------------------Client Has Started Their Order, Ready for Pickup-------------------');
  const payload = {
    store: `Kenny G's Saxophone 'n More Store`,
    orderID: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
  };

  customerPickUp2(payload);
}, 2000);
