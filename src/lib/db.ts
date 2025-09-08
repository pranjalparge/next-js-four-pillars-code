import mongoose from "mongoose";

const db: string = "mongodb+srv://4pii:kSUVg4bKF6wx8wun@cluster0.mckibmd.mongodb.net/Website_Node_App?retryWrites=true&w=majority";

if (!(global as any).mongoose) {
  (global as any).mongoose = { conn: null, promise: null };
}

const cached = (global as any).mongoose;

async function connect(): Promise<typeof mongoose> {
  try {
    if (cached.conn) {
      console.log("✅ Using existing database connection");
      return cached.conn;
    }

    if (!cached.promise) {
      console.log("⚡ Connecting to MongoDB...");
      cached.promise = mongoose.connect(db).then((conn) => {
        console.log("✅ MongoDB connected");
        return conn;
      });
    }

    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message || String(error));
  }
}


export default connect;
