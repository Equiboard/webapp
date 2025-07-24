import mongoose from "mongoose";

let isConnected = false;

export async function connectToDatabase() {
    if (isConnected) {
        return;
    }
    
    try {
        // Assuming mongoose is already imported and configured
        await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/mydatabase");
        console.log("Connected to MongoDB");
        isConnected = true;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
    }