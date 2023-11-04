//creating a express server
const express = require("express");
//allows to fetch the values in .env with the help of process module
const dotenv = require("dotenv").config();

const app = express();

//creating a static server
const port = process.env.PORT || 5000;

//first has the common route then it checks the routs folder and contactRoutes.js file
app.use("/api/contacts", require("./routes/contactRoutes"));


//listen to the port and exectue the call back function
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});