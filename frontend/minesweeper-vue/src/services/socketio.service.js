import { io } from 'socket.io-client';

class SocketioService {
    socket = io(process.env.VUE_APP_SOCKET_ENDPOINT);
    constructor() { }

    setupSocketConnection(data, res) {
        this.socket.emit('new user', data.username);

        console.log('Connecting ' + data.username + ' to socket...');

        if (data.intent === 'create') {
            this.socket.emit('new game', data.username, res);
        }

        if (data.intent === 'join') {
            this.socket.emit('join game', data.username, res);
        }

        return;
    }

    setGameOptions(data, res) {
        this.socket.emit('set options', data, res);
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }

    // Handle message receive event
    sendMessage({ message, roomName }, cb) {
        if (this.socket) this.socket.emit('message', { message, roomName }, cb);
    }

}

export default new SocketioService();