const message = document.getElementById('message');
const sendForm = document.getElementById('send-form');
const messageBody = document.getElementsByClassName('.box-body')

const socket = io('http://localhost:3001');