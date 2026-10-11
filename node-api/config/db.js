import mongoose from "mongoose";

export async function connectDB() {
  try {
    const mongoUri =
    process.env.NODE_ENV === "test"
    ? process.env.MONGO_TEST_URI
    : process.env.MONGO_URI;
    await mongoose.connect(mongoUri);

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}