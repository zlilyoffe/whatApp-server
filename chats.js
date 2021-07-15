const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    userIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
       },
    ],
});

// module.exports.messageSchema = messageSchema;

let Chat = mongoose.model("Chat", chatSchema);

// User.init(); // when we need to create a new index

module.exports.getAll = (req, res) => {
  let filter = {};

  // getting from the URL query string (?userid=XXXXX)
  if (req.query.userid) {
    filter.userIds = req.query.userid;
  }
  Chat.find(filter)
    // .populate("userIds", "userName") //?
    .then((result) => res.json(result));
};

module.exports.getById = (req, res) => {
    Chat.findById(req.params.id)
    .populate("userIds")
    .then((result) => res.json(result));
};

//return all chats from a speccific users
module.exports.getFriends = (req, res) => {
  Chat.find({ userIds: req.params.id })
    .populate("userIds", "userName")
    .then((result) => res.json(result));
};

module.exports.createNew = (req, res) => {
    let chat = new Chat({
    userIds: req.body.userIds,

  }); 
  chat
    .save()
    .then((chat) => res.status(201).json(chat))
    .catch((err) => {
      console.error(err);
      res.status(500).send(`Internal server error: ${err}`);
    });
};

/*module.exports.update = (req, res) => {
  Chat.findById(req.params.id).then((chat) => {
    if (chat) {
      chat.userIds = req.body.userIds;
      chat.save().then((chat) => {
        if (chat) {
          res.json(chat);
        } else {
          // TODO: investigate error
          res.status(500).send(`internal server error: ${err}`);
        }
      });
    }
  });
};*/