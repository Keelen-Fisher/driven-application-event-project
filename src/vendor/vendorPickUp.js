'use strict';

module.exports = (socket) => (payload) => {

  setTimeout(() => {
    console.log(`CONFIRM the order for: ${payload.customer}`);
    socket.emit('IN-TRANSIT', payload)
  }, 4000); 

  setTimeout(() => {
    console.log(`DELIVER the order for: ${payload.customer}`);
    socket.emit('DELIVERED', payload);
  }, 8000)

};
