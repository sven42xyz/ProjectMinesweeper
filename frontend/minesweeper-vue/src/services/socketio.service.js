import { io } from 'socket.io-client';

class SocketioService {
    socket = io(process.env.VUE_APP_SOCKET_ENDPOINT);
    constructor() { }

    setupSocketConnection(data) {
        this.socket.emit('new user', data.username)

        console.log('Connecting ' + data.username + ' to socket...');

        if (data.intent === 'create') {
            this.socket.emit('new game', data.username, tb => {
                console.log(tb);
            });
        }

        return data.intent
    }

    subscribeToGame(tb) {
        if (!this.socket) return (true);
        this.socket.on('game', game => {
            console.log('Game created');
            return tb(null, game);
        });
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }

    // Handle message receive event
    subscribeToMessages(cb) {
        if (!this.socket) return (true);
        this.socket.on('message', msg => {
            console.log('Room event received!');
            return cb(null, msg);
        });
    }

    sendMessage({ message, roomName }, cb) {
        if (this.socket) this.socket.emit('message', { message, roomName }, cb);
    }

}

export default new SocketioService();