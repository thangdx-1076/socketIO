var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var http = require("http");
var socketio = require("socket.io");
var cors = require("cors");
var app = express();
app.use(cors());
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var commentRouter = require("./routes/commentRouter");
var productRouter = require("./routes/productRouter");
// Create the http server
const server = require("http").createServer(app);

// Create the Socket IO server on
// the top of http server
// const io = socketio(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

var clients = 0;
io.on("connection", function (socket) {
  clients++;
  console.log(socket.id);

  socket.emit("newclientconnect", { description: "Hey, welcome!" + socket.id });
  io.sockets.emit("newclientconnect1", { description: "ALL CLIENT" });
  socket.broadcast.emit("newclientconnect", {
    description: clients + " clients connected!",
  });
  socket.on("disconnect", function () {
    clients--;
    socket.broadcast.emit("newclientconnect", {
      description: clients + " clients connected!",
    });
  });
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/comments", commentRouter);
app.use("/products", productRouter);
// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error
  // in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = { app: app, server: server };
