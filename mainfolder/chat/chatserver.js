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
  socket.on("send-chat-message", (message) => {
    socket.broadcast.emit("chat-message", message);
  });
  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", users[socket.id]); // il primo argomento è il nome dell'evento
    delete users[socket.id];
  });
});
