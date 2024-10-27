import { v2 as cloudinary } from 'cloudinary';

// Cloudinary configuration
const connectCloudinary = async (): Promise<void> => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME || "dbwdkpovl",
    api_key: process.env.API_KEY || "424975841827633",
    api_secret: process.env.API_SECRET || "Awbs7DbD_lfjbNtUsuKNfpI9-4A",
  });
};

export default connectCloudinary;
