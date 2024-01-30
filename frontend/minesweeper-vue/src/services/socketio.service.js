import { io } from 'socket.io-client';

class SocketioService {
/*     socket = io(process.env.VUE_APP_SOCKET_ENDPOINT); */
    /* socket = io('http://192.168.178.38:3000', {
        withCredentials: true,
    }); */

    socket = io.connect(process.env.VUE_APP_SOCKET_ENDPOINT, 
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

    killGame(data, res) {
        //ifHostThenEmit
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

    enterGame(data, res) {
        this.socket.emit('enter game', data, res);

        return;
    }

    playerReady(data, res) {
        this.socket.emit('player ready', data, res);

        return;
    }

    sendMessage({ message, SENDERID, roomName }, res) {
        console.log(SENDERID);
        this.socket.emit('message', { message, SENDERID, roomName }, res);

        return;
    }

    setPlayerColor(data, res) {
        this.socket.emit('change color', data, res);

        return;
    }

    handleGameboardClick(data, res) {
        //this line has no "real" significance to the flow of operations
        //but removing it will cause the emit to not be fired unless hot updating
        //my guess is that it reloads the socket instance...
        //i hate this shit, fuck socketio
        this.socket.connect();
        
        this.socket.emit("field click", data, res);

        return;
    }

    restartGame(data, res) {
        this.socket.emit("restart game", data, res);

        return;
    }

}

export default new SocketioService();