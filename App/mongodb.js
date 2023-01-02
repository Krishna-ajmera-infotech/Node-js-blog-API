// const mongoose = require('mongoose');
// mongoose.set('strictQuery', true);
//  mongoose.connect(`${process.env.MONGO_URL}/${process.env.MONGO_DATABASE}`)
//  .then(() => {
//    console.log("Connection Successful! ");
//  })
//  .catch((err) => {
//    console.log(err);
//  });

const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
mongoose.connect(`${process.env.MONGO_URL}/${process.env.MONGO_DATABASE}`);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("We're connected to the database!");
});

module.exports = { db };
