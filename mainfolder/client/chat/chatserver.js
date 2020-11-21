const io = require("socket.io")(3000, {
  cors: {
    origin: "*",
  },
});

const users = {};
//const cors = require("cors");
//io.set("origins", "*:*"); //io.origins = "*:*";
io.on("connection", (socket) => {
  socket.on("new-user", (user) => {
    users[socket.id] = user;
    socket.broadcast.emit("user-connected", user); // il primo argomento è il nome dell'evento
  });
  console.log("New user in the chat.");
  socket.on("send-chat-message", (message) => {
    console.log(message);
    socket.broadcast.emit("chat-message", message);
  });
});
