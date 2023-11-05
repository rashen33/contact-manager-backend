const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


//@desc Register a user
//@routs POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  //checking weather the fileds are empty 
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!"); 
  }

  //checking weather the email is already exist
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User alerady registered");
  }

  //encrypting the password using bcrypt lib
  //creating a hashed password
  //the two pars of this method are pw and number of salt rounds
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed password :", hashedPassword);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log(`User created ${user}`);

  //if user is successfully created send the info to the user
  if (user) {
    res.status(201).json({
      _id: user.id,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("User data not valid");
  }

  res.json({ message: "Register the user" });
});

//@desc Login a user
// @routs GET /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  //taking the email and password from the body
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  //taking the emain from the req body and finding it from the db
  const user = await User.findOne({ email });
  console.log(user);

  //comparing the entered pw with hashedpassword
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessTocken = jwt.sign(
      {
        //payload
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      //access token secreat
      process.env.ACCESS_TOKEN_SECRET,
      //experation date
      { expiresIn: "15m" }
    );
    // console.log(process.env.ACCESS_TOKEN_SECRET);
    res.status(200).json({ accessTocken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
});

//@desc Current user info
//@routs GET /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json({ message: "Current user" });
});

module.exports = { registerUser, loginUser, currentUser };
