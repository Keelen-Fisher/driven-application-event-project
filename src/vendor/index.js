'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3002');
const confirmPickUp = require('./vendorPickUp');
const confirmPickUp2 = confirmPickUp(socket);


socket.on('NEWCUSTOMER', confirmPickUp2);


