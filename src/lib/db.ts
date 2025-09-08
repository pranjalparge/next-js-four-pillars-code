import mongoose from "mongoose";
// const dbUri = process.env.mongoURI
// if(!dbUri){
//     throw new Error("mongodb uri is not present in env")
// }

const db : string = "mongodb+srv://4pii:kSUVg4bKF6wx8wun@cluster0.mckibmd.mongodb.net/Website_Node_App?retryWrites=true&w=majority"
// async function connect() : Promise<void>{
//     const connectionState : number = mongoose.connection.readyState
//     if(connectionState == 1){
//         console.log("database already connected")
//         return 
//     }
//     if(connectionState == 2){
//         console.log("connecting ....");
//         return;
//     }
//     try {
//         await mongoose.connect(db)
//         console.log("mongodb connected")
//     } catch (error) {
//         console.log(error)
//         if(error instanceof Error){
//             throw error
//         }
//         throw new Error(String(error))
//     }
// }

// export default connect


let cached = (global as any).mongoose;


if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connect(): Promise<typeof mongoose> {
  try {
    if (cached.conn) {
    console.log("✅ Using existing database connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("⚡ Connecting to MongoDB...");
    cached.promise = mongoose.connect(db).then((mongoose) => {
      console.log("✅ MongoDB connected");
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

export default connect;