var socket = io();

var form = document.getElementById('form');
var input = document.getElementById('input');
let userName = document.getElementById('userName');

const popUp_enter_btn = document.getElementsByClassName('pop-up_enter-btn')[0];
const popUp = document.getElementsByClassName('pop-up')[0];
const messages = document.getElementById('messages');
const room = document.getElementById('room');
const popUp_noRoom_btn = document.getElementsByClassName('pop-up_no-room-btn')[0];

popUp_enter_btn.addEventListener('click', () => {
    if(!room.value) {
        room.focus();
        room.style.boxShadow = '0 0 0 0.25rem rgb(253 13 83 / 25%';
    }else{
        closePopUp();
    };    
});

popUp_noRoom_btn.addEventListener('click', closePopUp);

function closePopUp(){
    if (userName.value) {
        if(room.value) {
            socket.emit('join-room',  room.value, userName.value, msg => {
                appendMsg(msg);
            });
        };
        userName = userName.value;
        popUp.style.display = 'none';
    }
};

function sendMsg(e){
    e.preventDefault();
    if (input.value) {
        socket.emit('send-message', input.value, userName);
        appendMsg(input.value, userName);
        input.value = '';
    }
};
form.addEventListener('submit', sendMsg);
form.addEventListener('keydown', function(e) {
    if(e.key === 13) {
        sendMsg(e);
    };
});
socket.on('recieve-message', appendMsg);


function appendMsg(msg, user) {
    var item = document.createElement('li');
    if(user) {
        item.innerHTML = '<strong>'+ user + ': </strong>' + msg;
    } else {
        item.innerHTML = '<strong class="text-primary">' + msg + '</strong>';
    };
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
} 
