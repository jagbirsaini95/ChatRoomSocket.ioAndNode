//node server
const io = require('socket.io')({ cors: '*' });
const users = {};

io.on('connection', (socket) => {
    socket.on('new-user-joined', (user) => {
        console.log("new user joined", user);
        users[socket.id] = user;
        socket.broadcast.emit('user-joined', user);
    })
    socket.on('send-message', (message) => {
        socket.broadcast.emit('recieve', { message: message, name: users[socket.id] })
    })
})

const port = 8000;
io.listen(port)
