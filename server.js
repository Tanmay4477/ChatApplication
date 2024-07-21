const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const { sequelize, User, Message } = require("./models");
const authRoutes = require("./routes/auth");
const jwt = require("jsonwebtoken");
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());
app.use(express.static("public"));
app.use("/auth", authRoutes);

io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;

    try {
        const payload = jwt.verify(token, "secret");
        socket.user = await User.findByPk(payload.id);
        next();
    } catch (error) {
        next(new Error("Authentication Error"));
    }
});

io.on("connection", (socket) => {
    console.log(`User ${socket.user.username} connected`);
    
    socket.on("message", async (text) => {
        const message = await Message.create({ text, UserId: socket.user.id }); // saves
        io.emit("message", { text: message.text, user: socket.user.username }); // sends
      });
    });


server.listen(3000, () => {
    console.log(`Server is listening on port 3000`);
});
