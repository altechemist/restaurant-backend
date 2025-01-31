import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectToDB } from './config/mongodb';
import userRoutes from './routes/userRoutes';
import restaurantRoutes from './routes/restaurantRoutes';
import reservationRoutes from './routes/reservationRoutes';

dotenv.config();


// Initialize database connection before starting the server
const startServer = async () => {
  try {

    await connectToDB(); // Wait for DB connection to complete 
    const app: Application = express();

    // Middleware
    app.use(express.json());
    app.use(cors());

    // Routes
    app.use('/api/users', userRoutes);
    app.use('/api/restaurants', restaurantRoutes);
    app.use('/api/reservations', reservationRoutes);

    app.get('/', (req: Request, res: Response) => {
      res.send('API is running...');
    });

    const PORT: number = parseInt(process.env.PORT as string, 10) || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1); // Exit process with failure if DB connection fails
  }
};

// Start the server
startServer();