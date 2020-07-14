import socketio from 'socket.io-client';
import { API_DOMAIN } from '../constants/api';

const socket = socketio(API_DOMAIN, {
  autoConnect: false,
});

function notifyNewOrder(notifyStore) {
  socket.on('new-order', notifyStore);
}

function connect(store) {
  socket.io.opts.query = {
    store_id: store,
  };
  socket.connect();
}

function disconnect() {
  if (socket.connected) socket.disconnect();
}

export { connect, disconnect, notifyNewOrder };
