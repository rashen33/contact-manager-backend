//creating a express server
const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
//allows to fetch the values in .env with the help of process module
const dotenv = require("dotenv").config();

connectDb();

const app = express();

//creating a server from the env. or static server
const port = process.env.PORT || 5000;

//this is a body passser
//this will accept data from client side and pass it to the server side(acts as a middleweare from express")
app.use(express.json());

//first has the common route then it checks the routs folder and contactRoutes.js file
app.use("/api/contacts", require("./routes/contactRoutes"));

//end point for registration
app.use("/api/users", require("./routes/userRoutes"));

//middlewerar used to convert the html error message to json format
app.use(errorHandler);

//listen to the port and exectue the call back function
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});