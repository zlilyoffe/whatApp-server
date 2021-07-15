const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true},
    phoneNumber: String,
    firstName: String,
    lastName: String,
    picURL: String,
});

module.exports.userSchema = userSchema;

let User = mongoose.model("User", userSchema);

// User.init(); // when we need to create a new index

module.exports.getAll = (req, res) => {
  let filter = {};
  // creating a search filter if provided
  if (req.query.search) {
    // searching by first name only
    // using regular expression, finding all users containing the search string
    // (i = case insensitive)
    // filter.firstName = new RegExp(req.body.search, "i");

    // searching on first & last names together
    let regExp = new RegExp(req.query.search, "i");
    filter = { $or: [{ firstName: regExp }, { lastName: regExp }] };
  }
  User.find(filter).then((result) => res.json(result));
};

const getUserById = (userId, res) => {
  User.findById(userId)
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).send(`404: user #${userId} wasn't found`);
      }
    })
    .catch((err) => {
      res.status(500).send("500: Ilegal parameter!!!");
    });
};

module.exports.getById = (req, res) => {
  getUserById(req.params.id, res);
};

module.exports.getLoggedUserByCookie = (req, res) => {
  getUserById(req.cookies.userId, res);
};

module.exports.createNew = (req, res) => {
    let user = new User({
    userName: req.body.userName,
    phoneNumber: req.body.phoneNumber,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    picURL: req.body.picURL,
  }); 
  user
    .save()
    .then((user) => res.status(201).json(user))
    .catch((err) => {
      console.error(err);
      res.status(500).send(`Internal server error: ${err}`);
    });
};

module.exports.update = (req, res) => {
    User.findById(req.params.id).then((user) => {
      if (user) {
        user.userName = req.body.userName;
        user.phoneNumber = req.body.phoneNumber;
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.picURL = req.body.picURL;
  
        user
          .save()
          .then((user) => {
            if (user) {
              res.json(user);
            }
          })
          .catch((err) => {
            res.status(500).send(`internal server error: ${err}`);
          });
      } else {
        res
          .status(404)
          .send(`404: user #${req.params.id} wasn't found and cannot be updated`);
      }
    });
  };


module.exports.deleteUsers = (req, res) => {
    User.findByIdAndRemove(req.params.id)
      .then((user) => {
        if (user) {
          res.json(user);
        } else {
          res
            .status(404)
            .send(
              `404: user #${req.params.id} wasn't found and cannot be deleted`
            );
        }
      })
      .catch((err) => {
          res.status(500).send(`internal server error: ${err}`);
      });
  };
  