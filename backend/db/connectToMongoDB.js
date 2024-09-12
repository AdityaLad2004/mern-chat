import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load .env file

console.log('MongoDB URI:', process.env.MONGO_DB_URI); // Add this to debug

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB", error.message);
    }
};

export default connectToMongoDB;
