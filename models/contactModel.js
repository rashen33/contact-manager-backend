const mongoose = require("mongoose");

//creating the schema for contact
const contactSchema = mongoose.Schema({
    name: {
        type : String,
        required: [true, "Plase add the contact number"]
    },
    email: {
        type : String,
        required: [true, "Plase add the contact email address"]
    },
    phone: {
        type : String,
        required: [true, "Plase add the contact phone number"]
    }
},{
    timestamp: true
}
);

module.exports = mongoose.model("Contact", contactSchema);