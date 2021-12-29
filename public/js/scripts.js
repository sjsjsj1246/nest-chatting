const socket = io('/chat');

const getElementById = (id) => document.getElementById(id) || null;

//* get DOM element
const helloStrangerElement = getElementById('hello_stranger');
const chattingBoxElement = getElementById('chatting_box');
const formElement = getElementById('chat_form');

//* gloval socket handler
socket.on('user_connected', (username) => {
  drawNewChat(`${username}: connected`);
});
socket.on('new_chat', (data) => {
  const { chat, username } = data;
  drawNewChat(`${username}: ${chat}`);
});

//* event callback funcitons
const handleSubmit = (event) => {
  event.preventDefault();
  const inputValue = event.target.elements[0].value;
  if (inputValue !== '') {
    socket.emit('submit_chat', inputValue);
    drawNewChat(`me: ${inputValue}`);
    event.target.elements[0].value = '';
  }
};

//* draw functions
const drawHelloStanger = (username) => {
  helloStrangerElement.innerHTML = `Hello ${username} :)`;
};

const drawNewChat = (message) => {
  const wrapperChatBox = document.createElement('div');
  const chatBox = `
        <div>
            ${message}
        </div>
    `;
  wrapperChatBox.innerHTML = chatBox;
  chattingBoxElement.append(wrapperChatBox);
};

function helloUser() {
  const username = prompt('What is your name?');
  drawHelloStanger(username);
  socket.emit('new_user', username, (data) => {
    console.log(data);
  });
}

function init() {
  helloUser();
  formElement.addEventListener('submit', handleSubmit);
}

init();
