const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    //establishing a connection with the database
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(
      "Database Connected: ",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDb;
