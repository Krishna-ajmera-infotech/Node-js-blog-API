const express = require("express");
var bodyParser = require('body-parser');
const cors = require('cors');
var fs = require('fs');
var morgan = require('morgan');
const dotenv =  require("dotenv").config();
const app = express();
require("./mongodb");
// Added library to get current directory name
var path = require('path');
// Custom route of the API 
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
//Assign a short variable name to the enviermental variable
const port =  process.env.PORT_NUMBER;

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
// setup the logger
// app.use(morgan('combined'));
app.use(morgan('combined', { stream: accessLogStream }));

//  Middleware initializations
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());



app.use(express.static('public'));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Api routes
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);

// server information
app.listen(port, () => {
  console.log(`Server is runnig on the port number ${port}`);
});
