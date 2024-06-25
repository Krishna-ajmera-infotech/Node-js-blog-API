// index.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import authRoute from './routes/auth.js';
import userRoute from './routes/users.js';
import postRoute from './routes/posts.js';
import connectToMongoDB from './mongodb.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT_NUMBER || 3000;

//  Middleware initializations
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Api routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

// server information
connectToMongoDB().then(() => {
  // Start the server after successful MongoDB connection
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(err => {
  console.error('Failed to connect to MongoDB:', err);
});