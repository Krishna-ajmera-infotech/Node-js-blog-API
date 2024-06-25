import mongoose from 'mongoose';

const connectToMongoDB = async () => {
  try {
    const url = "mongodb://127.0.0.1:27017/mydatabase"; // Replace with your MongoDB database name
    mongoose.set('strictQuery', true); // Optionally set mongoose options

    await mongoose.connect(url);
    console.log("Connected successfully to MongoDB");
  } catch (err) {
    console.error("Connection error", err);
    // Handle connection error as needed
  }
};

export default connectToMongoDB;