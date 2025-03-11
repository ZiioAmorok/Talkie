import mongoose from "mongoose";

// Funkcia na pripojenie k MongoDB
const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);

    console.log("✅ MongoDB pripojené");
  } catch (error) {
    console.error("❌ Chyba pripojenia k MongoDB:", (error as Error).message);
    process.exit(1);
  }
};

export default connectDB;
