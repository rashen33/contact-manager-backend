const asyncHandler = require("express-async-handler");


//@desc Register a user
//@routs POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  res.json({ message: "Register the user" });
});

//@desc Login a user
//@routs POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: "Login the user" });
});

//@desc Current user info
//@routs POST /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json({ message: "Current user" });
});

module.exports = { registerUser, loginUser, currentUser };
