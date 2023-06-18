const socket = io('http://localhost:8000');

const messageBody = document.getElementsByClassName('.box-body')
const message = document.getElementById('message');
const sendForm = document.getElementById('send-form');

const appendMessage = (message, position) => {
    console.log(message);
    const messageBox = document.createElement('div');
    messageBox.innerText = message;
    messageBox.classList.add('border');
    messageBox.classList.add(position);
    messageBody.append(messageBox)

}

const userName = prompt('Please enter your name to join chat ');
socket.emit('new-user-joined', user = { name: userName })

socket.on('user-joined', (user) => {
    appendMessage(`${user.name} joined the chat room`, 'right');
})