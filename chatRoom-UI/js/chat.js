const socket = io('http://localhost:8000');

const messageBody = document.querySelector('.box-body')
const message = document.getElementById('message');
const sendForm = document.getElementById('send-form');
const closeBtn = document.getElementById('close-btn');
const endChatBtn = document.getElementById('end-chat-btn');
const chatroomContainer = document.getElementById('chatroom-container');
const userNameContainer = document.getElementById('user-name');
const chatroomIcon = document.getElementById('chatroom-icon');

const appendMessage = (message, position) => {
    console.log(message);
    const messageBox = document.createElement('div');
    messageBox.innerHTML = message;
    messageBox.classList.add('border-0');
    messageBox.classList.add(position);
    messageBody.append(messageBox)
}

const scrollToBottom = (el) => {
    let height = el.scrollHeight;
    el.scrollTop = height;
}

const closeChatbot = () => {
    console.log("chatbot closed");
    chatroomContainer.classList.add('display-none')
    chatroomIcon.classList.remove('display-none')
}

const openChatbot = () => {
    console.log("chatbot opened");
    chatroomIcon.classList.add('display-none')
    chatroomContainer.classList.remove('display-none')
    message.focus();
}

sendForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(e.target[0]);
    const message = e.target[0].value;
    appendMessage(`you: <b class="capitalize">${message}</b>`, 'right')
    socket.emit('send-message', message)
    e.target[0].value = '';
    scrollToBottom(messageBody);
    message.focus();
})

closeBtn.addEventListener('click', () => {
    closeChatbot();
})

chatroomIcon.addEventListener('click', () => {
    openChatbot();
})

endChatBtn.addEventListener('click', () => {
    socket.emit('disconnected', userName)
    endChatBtn.style.display = "none";
    closeChatbot();
})
let userName;
do {
    userName = prompt('Please enter your name to join chat ');
} while (!userName || userName.length < 4)

socket.emit('new-user-joined', user = { name: userName })

socket.on('user-joined', (user) => {
    appendMessage(`<b class="upper-case">${user.name}</b> joined the chat room`, 'center');
})

socket.on('you-joined', (user) => {
    openChatbot();
    appendMessage(`you joined the chat room`, 'center');
    userNameContainer.innerHTML = `Logged in as:<b class="upper-case"> ${user.name} </b>`;
    userNameContainer.classList.add('border');
    userNameContainer.style.textAlign = "right"
})

socket.on('recieve', (user) => {
    console.log(user);
    appendMessage(`<b class="capitalize">${user.message}</b>: ${user.name}`, 'left');
})

socket.on('you-disconnected', (user) => {
    console.log(user);
    appendMessage(`${user.message}`, 'center');
})

socket.on('user-disconnected', (user) => {
    console.log(user);
    appendMessage(`${user.message}`, 'center');
})
