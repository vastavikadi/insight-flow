import mongoose from "mongoose";
import { env } from "./env.js";

export async function connectDB() {
  try {
    await mongoose.connect(
      env.MONGODB_URI
    );

    console.log(
      "MongoDB Connected Successfully"
    );
  } catch (error) {
    console.error(
      "MongoDB Connection Failed",
      error
    );

    process.exit(1);
  }
}