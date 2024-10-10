import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';

// .env file ko load karne ke liye
dotenv.config();

const MONGO_URI: string = process.env.MONGO_URI || '';

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${(err as Error).message}`);
    process.exit(1);
  }
};

export default connectDB;
