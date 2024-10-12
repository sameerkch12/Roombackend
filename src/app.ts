import express from 'express';
import userRoutes from './routes/userRoutes';
import  connectDB from './config/db';
import hoteladmin from './routes/hoteladmin'

const app = express();
app.use(express.json());

// Connect to the database
connectDB();

// Define routes
app.use('/api/users', userRoutes);
app.use('/api/hoteladmin',hoteladmin);
// Error handling middleware
//app.use(errorHandler);

export default app;
