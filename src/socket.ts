import socketio from 'socket.io';
import app from './app';

import MessageController from './controllers/MessageController';

const io = socketio(app);

let ConnectedClients: string[] = [];

io.on('connection', socket => {
  ConnectedClients.push(socket.id);
  messageResponse(io);

  socket.on('messageRequest', data => {
    MessageController.setMessages(data);
    messageResponse(io);
  });

  socket.on('disconnect', () => {
    const clients = ConnectedClients.filter(client => client !== socket.id);
    ConnectedClients = clients;
    messageResponse(io);
  })
});

function messageResponse(io: socketio.Server) {
  io.sockets.emit('messageResponse', {
    messages: MessageController.getMessages(),
    users_count: ConnectedClients.length,
    messages_count: MessageController.getMessages().length,
  });
}

export default () => io;
