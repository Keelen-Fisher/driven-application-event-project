'use strict';

module.exports = (socket) => (payload) => {
  console.log('Sending Object: ', payload);
  socket.emit('CUSTOMER', payload );
};
