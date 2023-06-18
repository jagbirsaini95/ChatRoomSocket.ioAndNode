const socket = io('http://localhost:8000');

const messageBody = document.querySelector('.box-body')
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

sendForm.addEventListener('submit', (e) => {
    console.log(e);
    e.preventDefault();
    const message = e.target[0].value;
    appendMessage(`you: ${message}`, 'right')
    socket.emit('send-message', message)
    message.value = '';
})

const userName = prompt('Please enter your name to join chat ');
socket.emit('new-user-joined', user = { name: userName })

socket.on('user-joined', (user) => {
    appendMessage(`${user.name} joined the chat room`, 'center');
})

socket.on('recieve', (user) => {
    console.log(user);
    appendMessage(`${user.message}: ${user.name}`, 'left');
})