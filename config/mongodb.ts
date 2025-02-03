import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/userModel';
import { Restaurant } from '../models/restaurantModel';
import { Reservation } from '../models/reservationModel';

dotenv.config();

const connectionString = process.env.MONGO_URI as string;

let connectDB: mongoose.Connection | null = null;

const connectToDB = async (): Promise<mongoose.Connection> => {
  if (connectDB) return connectDB;

  try {
    console.log("🌐 Connecting to MongoDB...");
    const startTime = Date.now();

    // Set mongoose connection options
    const options = {
      serverSelectionTimeoutMS: 30000,  // 30 seconds for server selection
      socketTimeoutMS: 45000,          // 45 seconds for socket timeout
    };

    // Connect to MongoDB using Mongoose
    await mongoose.connect(connectionString, options);

    const endTime = Date.now();
    console.log(`✅ MongoDB connected successfully in ${endTime - startTime} ms`);

    connectDB = mongoose.connection;

    // Ensure required collections exist
    await createCollections(connectDB);

    return connectDB;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
};

// Function to check & create missing collections (with Mongoose)
const createCollections = async (db: mongoose.Connection) => {
  try {
    const startTime = Date.now();
    const existingCollections = await db.db?.listCollections().toArray() || [];
    const existingCollectionNames = existingCollections.map((c) => c.name);

    const requiredCollections = ["users", "restaurants", "reservations"];

    for (const collection of requiredCollections) {
      if (!existingCollectionNames.includes(collection)) {
        console.log(`✅ Collection '${collection}' is missing. Creating it...`);

        // Insert sample data to create collections
        if (collection === 'users') {
          const user = new User({
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'hashedpassword123',
          });
          await user.save();
        }

        if (collection === 'restaurants') {
          const restaurant = new Restaurant({
            name: 'The Great Restaurant',
            address: '123 Main St, City, Country',
            rating: 4.5,
          });
          await restaurant.save();
        }

        if (collection === 'reservations') {
          const user = await User.findOne({ email: 'john.doe@example.com' });
          const restaurant = await Restaurant.findOne({ name: 'The Great Restaurant' });

          if (user && restaurant) {
            const reservation = new Reservation({
              userId: user._id,
              restaurantId: restaurant._id,
              date: new Date(),
              numberOfPeople: 4,
            });
            await reservation.save();
          }
        }

        console.log(`✔ Created missing collection: '${collection}' with sample data.`);
      } else {
        console.log(`✔ Collection '${collection}' already exists`);
      }
    }

    const endTime = Date.now();
    console.log(`⏱ Collection check completed in ${endTime - startTime} ms`);
  } catch (error) {
    console.error("❌ Error checking/creating collections:", error);
  }
};

export { connectToDB };
