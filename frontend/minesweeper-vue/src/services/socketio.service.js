import { io } from 'socket.io-client';

class SocketioService {
    socket;
    constructor() {}
  
    setupSocketConnection() {
      this.socket = io(process.env.VUE_APP_SOCKET_ENDPOINT);
      console.log(`Connecting socket...`);
      this.socket.emit('my message', 'Hello there from Vue.');
      this.socket.on('my broadcast', (data) => {
        console.log(data);
      });
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }

    // Handle message receive event
    subscribeToMessages(cb) {
        if (!this.socket) return(true);
        this.socket.on('message', msg => {
        console.log('Room event received!');
        return cb(null, msg);
        });
    }
        
    sendMessage({message, roomName}, cb) {
        if (this.socket) this.socket.emit('message', { message, roomName }, cb);
    }

  }
  
  export default new SocketioService();