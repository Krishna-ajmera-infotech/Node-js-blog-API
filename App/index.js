const express = require("express");
require("dotenv").config();
const app = express();
const port = 3000;
require("./mongodb");
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');

//  main page
app.use(express.json());
app.get("/", (req, res) => {
 if(true){
  res.redirect('/api/auth/login');
 }
});

app.get("/api/auth/login", (req, res) => {
 res.send('You are not a real user')
 });
 

// Api routes
// /api/auth/regiter
// /api/auth/login

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
// Running Serper port
app.listen(port, () => {
  console.log(`Server is runnig on port Number ${port}`);
});
