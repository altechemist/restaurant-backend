import { MongoClient, Db } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

// MongoDB URI from environment variables
const connectionString = process.env.MONGO_URI as string;
const client = new MongoClient(connectionString);

let connectDB: Db | null = null; // Will hold the DB connection

// Async function to connect to MongoDB and return the DB connection
const connectToDB = async (): Promise<Db> => {
  if (connectDB) return connectDB; // If already connected, return the existing connection
  
  try {
    const conn = await client.connect();
    connectDB = conn.db("restaurant"); // Specify your database name here
    console.log("MongoDB connected successfully");
    return connectDB;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error; // Throw error to handle it at higher level
  }
};

export { connectToDB }; // Export the function to use in other files