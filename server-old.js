const express = require("express");
const users = require("./users");//because we want a local file, we need to use ./


// Initializing Server
const app = express(); // express is a function that returns an instance
app.use(express.json()); // this makes it easier to process JSON requests
app.listen(8080, () => console.log("Our server is listening on port 8080... ")); // Now we're live!
// handle request to 'home page'
app.get("/", (req, res) => {
  res.send(
    "<h1>Welcome to my Whats'App!</h1>\n <p>Who would you like to talk to today?</p>"
  );
});
// handle request for all students
app.get("/api/users", users.getAll); //send a JSON response
  // handle request for one student by id
app.get("/api/users/:id", users.getById);
    // updating a specific student
app.put("/users/:id", users.update);

app.post("/users", users.creatNew);
    // Deleting a specific student by ID
app.delete("/users/:id", users.deleteUsers);