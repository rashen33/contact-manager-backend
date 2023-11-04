const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all contacts
//@routs GET /api/contacts
//@access public
const getContacts = asyncHandler(async (req, res) => {
  //getting the contacts from the db
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

//@desc Get contact by id
//@routs GET /api/contacts/:id
//@access public
const getContact = asyncHandler(async (req, res) => {
  //getting the contact by id
  const contact = await Contact.findById(req.params.id);
  if(!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  res.status(200).json(contact);
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

  const contact = await Contact.create({
    name, //equls to request.body.name. in es6 key and value is same we can use key
    email,
    phone
  });
  res.status(201).json(contact);
});

//@desc Put all contacts
//@routs PUT /api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if(!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id, //getting the id of the contact that needs to be updated
    req.body, //getting the updated body 
    { new: true } //query option
  );


  res.status(200).json(updatedContact);
});

//@desc Delete a contact
//@routs DELETE /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  //deleting the contact that has the provided id
  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};