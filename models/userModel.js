const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required: [true, "Please add the user name"]
    },
    email :{
        type : String, 
        required : [true, "Please add a email"],
        unique : [true, "Email address is already exsit"]
    }
}, 
{
    timestamps: true
});

module.exports = mongoose.model("User" , userSchema);