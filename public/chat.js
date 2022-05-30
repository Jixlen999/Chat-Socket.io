var socket = io();

var form = document.getElementById('form');
var input = document.getElementById('input');
let userName = document.getElementById('userName');

const popUp_btn = document.getElementsByClassName('pop-up_body')[0];
const popUp = document.getElementsByClassName('pop-up')[0];
const messages = document.getElementById('messages');


popUp_btn.addEventListener('submit', closePopUp);
popUp_btn.addEventListener('keydown', function(e) {
    if(e.key === 13) {
        closePopUp();
    }
});

function closePopUp(e){
    e.preventDefault();
    if (userName.value) {
        userName = userName.value;
        popUp.style.display = 'none';
    }
};

function sendMsg(e){
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', input.value, userName);
        input.value = '';
    }
};
form.addEventListener('submit', sendMsg);
form.addEventListener('keydown', function(e) {
    if(e.key === 13) {
        sendMsg(e);
    };
});
socket.on('chat message', function(msg, user) {
    var item = document.createElement('li');
    item.innerHTML = '<strong>'+ user + ': </strong>' + msg;
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
});
