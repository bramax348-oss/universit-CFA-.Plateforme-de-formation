import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/testDB");
    console.log("✅ MongoDB connecté");
  } catch (err) {
    console.error("❌ MongoDB error:", err);
    process.exit(1);
  }
};