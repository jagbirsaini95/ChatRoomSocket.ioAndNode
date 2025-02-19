//node server
const io = require('socket.io')({ cors: '*' });
const users = {};

io.on('connection', (socket) => {
    let userName;
    socket.on('new-user-joined', (user) => {
        // console.log("new user joined", user);
        users[socket.id] = user;
        userName = users[socket.id].name;
        socket.emit('you-joined', user);
        socket.broadcast.emit('user-joined', user);
    });
    socket.on('send-message', (message) => {
        // console.log(userName,": ",message);
        socket.broadcast.emit('recieve', user = { message: message, name: userName });
    });
    socket.on('disconnected', (user) => {
        // console.log("user diconnected:",user);
        socket.emit('you-disconnected', user = { message: `you left the room`, name: userName });
        socket.broadcast.emit('user-disconnected', user = { message: `${userName} left the room`, name: userName });
        socket.disconnect();
    })
})
io.on('disconnect', (socket) => {

})

const port = 8000;
io.listen(port)
