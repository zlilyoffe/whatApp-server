
let users = [
    {
      id: 1,
      userName: "zuli",
      firstName: "zlil",
      lastName: "yoffe",
      phoneNum: 0522522523,
      contry: "Israel",
      email: "zlil@gmail.com",
      profilePic: "zlil.jpg"
    },
    {
      id: 2,
      userName: "dani",
      firstName: "daniel",
      lastName: "yoffe",
      phoneNum: 0522522523,
      contry: "Israel",
      email: "daniel@gmail.com",
      profilePic: "daniel.jpg"
    },
    {
      id: 3,
      userName: "yaya",
      firstName: "yatir",
      lastName: "yoffe",
      phoneNum: 0522522523,
      contry: "Israel",
      email: "yatir@gmail.com",
      profilePic: "yatir.jpg"
    },
  ];

  module.exports.getAll = (req, res) => {
    res.json(users);
  };

  module.exports.getById = (req, res) => {
    let reqId = parseInt(req.params.id); // req.params.id holds the id parameter (:id), as a string
    // finding the specific student by the id we got as a request parameter
    let user = users.find((u) => u.id === reqId);
    if (user) {
      //check if student exists (if not, it will be 'null')
      res.json(user);
    } else {
      // if no student was found
      // set the response status to 404 and return appropriate message
      res.status(404).send(`user ${reqId} does not exist`);
    }
  };

  module.exports.update = (req, res) => {
    // finding the specific student by the id we got as a request parameter (:id)
    let user = users.find((s) => s.id === parseInt(req.params.id));
    // if the student exists, update it and return it to the client
    if (user) {
        user.userName = req.body.userName;
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.phoneNum = req.body.phoneNum;
        user.contry = req.body.contry;
        user.email = req.body.email;
        user.profilePic = req.body.profilePic;
      res.json(user);
    } else {
      // if no student was found
      // set the response status to 404 (= not found) and return appropriate message
      res.status(404).send(`user ${req.params.id} does not exist and cannot be updated`);
    }
  };

  module.exports.creatNew = (req, res) => {
    let newId = users[users.length - 1].id + 1;

      let newUser = {
        id: newId,
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNum: req.body.phoneNum,
        contry: req.body.contry,
        email: req.body.email,
        profilePic: req.body.profilePic,
      };

    users.push(newUser);
    res.status(201).json(newUser);
  };

  module.exports.deleteUsers = (req, res) => {
  // finding the specific student by the id we got as a request parameter (:id)
  let user = users.find((s) => s.id === parseInt(req.params.id));
  if (user) {
    // delete the student from the array and return an appropriate response
    let idx = users.indexOf(user);
    users.splice(idx, 1);
    // returning the deleted student to the client
    res.json(user);
  } else {
    // if no student was found
    // set the response status to 404 (= not found) and return appropriate message
    res.users(404).send(`user ${req.params.id} does not exist and cannot be deleted`);
  }
};