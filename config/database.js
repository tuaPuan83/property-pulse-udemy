import mongoose from "mongoose";

// Get connection string from .env.local
const MONGODB_URI = process.env.MONGODB_URI;

// Check MONGODB_URI is valid
if (!MONGODB_URI) {
  throw new Error("Not found MONGODB_URI from .env file");
}

// Keep permanently string for dev mode
// build property name mongoose
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  // If connected then use same cached.conn
  if (cached.conn) {
    console.log("MongoDB already connected");
    return cached.conn;
  }

  // If not connect then connect it and kepp promise
  // not await here
  if (!cached.promise) {
    mongoose.set("strictQuery", true);
    console.log("MongoDB is connecting...");

    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
      })
      .then((mongooseInstance) => {
        console.log("MongoDB is connected");
        return mongooseInstance;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.error("MongoDB cannot connect", error.message);
    throw Error;
  }
  return cached.conn;
};

export default connectDB;
