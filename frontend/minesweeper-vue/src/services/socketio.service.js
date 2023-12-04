import { io } from 'socket.io-client';

class SocketioService {
/*     socket = io(process.env.VUE_APP_SOCKET_ENDPOINT); */
    /* socket = io('http://192.168.178.38:3000', {
        withCredentials: true,
    }); */

    socket = io.connect("http://192.168.178.38:3000", 
    { upgrade: false, transports: ['websocket'], reconnection: true, forceNew: false});
    
    constructor() {
    }

    subscribeToMessages(cb) {
        if (!this.socket) return(true);
        this.socket.on('message', msg => {
          console.log('Room event received!');
          return cb(null, msg);
        });
    }
        

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

        return;
    }

    joinLobby(data, res) {
        this.socket.emit('join lobby', data, res);

        return;
    }

    killLobby(data, res) {
        this.socket.emit('delete game', data, res);

        return;
    }

    getPlayers(data, res) {
        this.socket.emit('player join', data, res);

        return;
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }

    startGame(data, res) {
        this.socket.emit('start game', data, res);

        return;
    }

    // Handle message receive event
    sendMessage({ message, roomName }, cb) {
        if (this.socket) this.socket.emit('message', { message, roomName }, cb);
    }

}

export default new SocketioService();