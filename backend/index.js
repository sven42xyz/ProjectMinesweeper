const handler = require('express')();
const server = require('http').createServer(handler);
const io = require('socket.io')(server, {
    cors: {
        origins: ['http://localhost:8080']
    }
});

handler.get('/', (_, res) => {
    res.send('<h1>Hello World!</h1>');
});

io.on('connection', (socket) => {
    console.log('someone wants to sweep some mines!');
    socket.on('disconnect', () => {
        console.log('the mines have been swept');
    });
});

server.listen(3000, () => {
    console.log('Listening on port :3000');
});