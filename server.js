const express = require("express");
const mongoose = require("mongoose"); // a package for communicating with MongoDB
const Users = require("./users");//because we want a local file, we need to use ./
const Messages = require("./messages");//because we want a local file, we need to use ./
const Chats = require("./chats");
const cors = require("cors");
const cookieParser = require("cookie-parser");


// Initializing Server
const app = express(); // express is a function that returns an instance
app.use(express.json()); // this makes it easier to process JSON requests
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.listen(8080, () => console.log("Our server is listening on port 8080... ")); // Now we're live!

// connecting to MongoDB
const mongoURL = "mongodb+srv://zlilyoffe:161116zved@cluster0.pjel7.mongodb.net/whatsApp";

app.use(cookieParser()); //  Middleware that enable working with cookies
process.env.WHATSAPP_DB; // connection string

mongoose.set("useUnifiedTopology", true);

mongoose
    .connect(mongoURL, { useNewUrlParser: true})
    .then(() => console.log("connect to MpngoDB"))
    .catch((arr) => console.log(err));

// handle request to 'home page'
app.get("/", (req, res) => {
  res.write("<h1>Welcome to my Whats'App!</h1>");
  res.end();
});
// handle request for all students
app.get("/api/users", Users.getAll); //send a JSON response
  // handle request for one student by id
app.get("/api/users/:id", Users.getById);

app.get("/api/me", Users.getLoggedUserByCookie);
    // updating a specific student
app.put("/api/users/:id", Users.update);

app.post("/api/users", Users.createNew);
    // Deleting a specific student by ID
app.delete("/api/users/:id", Users.deleteUsers);

// handle request for all students
app.get("/api/messages", Messages.getAll); //send a JSON response
  // handle request for one student by id
app.get("/api/messages/:id", Messages.getById);
    // updating a specific student
app.put("/api/messages/:id", Messages.update);

app.post("/api/messages", Messages.createNew);
    // Deleting a specific student by ID
app.delete("/api/messages/:id", Messages.deleteMessages);

app.get("/api/chats", Chats.getAll); //send a JSON response
  // handle request for one student by id
app.get("/api/chats/:id", Chats.getById);

app.get("/api/chats/:id/messages", Messages.getByChat);

// app.get("/api/friends/:id,chats.getFriends");

app.post("/api/chats", Chats.createNew);

app.post("/api/chats/:id/messages", Messages.createNew);
