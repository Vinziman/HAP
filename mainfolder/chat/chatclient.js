const socket = io("http://localhost:3000"); // richiedo il socket
const messageForm = document.getElementById("sendContainer");
const messageInput = document.getElementById("messageInput");
const messageContainer = document.getElementById("messageContainer");

const name = prompt("What is your name? ");
appendMessage("You joined the chat.");
socket.emit("new-user", name);

socket.on("user-connected", (user) => {
  appendMessage(`${user} joined the chat.`);
});

socket.on("chat-message", (message) => {
  //socket.on(eventname, function)
  appendMessage(`${message.user}: ${message.text}`);
});

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const messageText = messageInput.value;
  socket.emit("send-chat-message", { user: name, text: messageText });
  messageInput.value = "";
  appendMessage(`You: ${messageText}`);
});

function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageContainer.appendChild(messageElement);
}
