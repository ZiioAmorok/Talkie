import mongoose from "mongoose";

// Funkcia na pripojenie k MongoDB
const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`MongoDB pripojené ${mongoose.connection.host}`);
  } catch (error) {
    console.error("Chyba pripojenia k MongoDB:", (error as Error).message);
    process.exit(1);
  }
};

export default connectDB;
