
import { Server } from 'socket.io';
 
const initWb = (server) => {
    const io = new Server(server, {
        cors: {
          origin: '*',
        },
      });
      
      io.on('connection', (socket) => {
        console.log('New WebSocket connection', socket.id);
      
        socket.on('chat:message', (data) => {
          io.sockets.emit('chat:message', data)
      
          // Envía un mensaje de respuesta al cliente
          socket.emit('response', 'Hola, cliente WebSocket');
        });
      
        socket.on('chat:typing', (data) => {
          console.log(data);
          socket.broadcast.emit('chat:typing', data)
        });

        
      });
}

export default initWb;
