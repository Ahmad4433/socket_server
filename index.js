const express = require("express");
require("dotenv").config();
const getConnection = require("./utils/getConnection");
const cors = require("cors");
const userAccountRoutes = require("./routes/userAccount");
const userListRoutes = require("./routes/userList");
const authRoutes = require("./routes/auth");
const socketio = require("socket.io");
const Message = require("./models/Message");
const Conversion = require("./models/Conversion");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res,next) => {
  res.send("server is running");
});
app.use("/user", userAccountRoutes);
app.use("/user", userListRoutes);
app.use("/user", authRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "server error";
  res.status(statusCode).json({ message: message });
});

getConnection();
const server = app.listen(process.env.PORT, () =>
  console.log(`server is running on port ${process.env.PORT}`)
);

// const io = socketio(server, {
//   cors: {
//     origin: "*",
//   },
// });

// const userData = new Map();
// io.on("connection", (socket) => {
//   const userId = socket.handshake.query.userId;
//   userData.set(userId, socket.id);
//   socket.on("message", async (message) => {
//     const receiver = userData.get(message?.receiver);
//     if (receiver) {
//       io.to(receiver).emit("live", message);
//     }

//     socket.emit("confirm", message);
//     const newMessage = new Message({
//       sender: message.sender,
//       receiver: message.receiver,
//       message: message.message,
//     });
//     const savedMessage = await newMessage.save();
//     let findedConversion = await Conversion.findOne({
//       parties: { $all: [message.sender, message.receiver] },
//     });
//     if (!findedConversion) {
//       findedConversion = new Conversion({
//         parties: [message.sender, message.receiver],
//         message: [savedMessage._id],
//       });
//     } else {
//       findedConversion.message.push(savedMessage._id);
//     }
//     await findedConversion.save();
//   });

//   socket.on("onSelect", async (id) => {
//     const findedUser = userData.get(id.selected);
//     if (findedUser) {
//       socket.emit("status", { online: true });
//     } else {
//       socket.emit("status", { online: false });
//     }

//     const history = await Conversion.findOne({
//       parties: { $all: [id.selected, id.sender] },
//     }).populate([
//       {
//         path: "message",
//       },
//     ]);

//     socket.emit("history", history);
//   });

//   socket.on("disconnect", () => {
//     userData.delete(userId);
//     io.emit("status", { online: false });
//   });
// });
