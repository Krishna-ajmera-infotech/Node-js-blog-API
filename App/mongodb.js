const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
 mongoose.connect(`${process.env.MONGO_URL}/${process.env.MONGO_DATABASE}`)
 .then(() => {
   console.log("Connection Successful! ");
 })
 .catch((err) => {
   console.log(err);
 });
