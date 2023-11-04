const asyncHandler = require("express-async-handler");

//@desc Get all contacts
//@routs GET /api/contacts
//@access public
const getContacts = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get all contacts" });
});

//@desc Get contact by id
//@routs GET /api/contacts/:id
//@access public
const getContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Get contact for ${req.params.id}` });
});

//@desc Post contact by id
//@routs POST /api/contacts/
//@access public
const createContact = asyncHandler(async (req, res) => {
  //printing the request body
  console.log("The request body is : ", req.body);

  //destructuring the request body sent from the client side
  const { name, email, phone } = req.body;

  //validating the name,email and phone and displaying the error message
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  res.status(201).json({ message: "Create contact" });
});

//@desc Put all contacts
//@routs PUT /api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update contact for ${req.params.id}` });
});

//@desc Delete a contact
//@routs DELETE /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete contact for ${req.params.id}` });
});

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
