import mongoose from "mongoose";
import dotenv from "dotenv";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to Mongo Db 😉😉");
  } catch (error) {
    console.log("Error");
  }
};

export default connectDB;
