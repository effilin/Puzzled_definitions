import mongoose from "mongoose";


const MONGODB_URI = process.env.MONGO_URI;


if(!MONGODB_URI) {
    throw new Error ( 'please define the env variable')
}

let cached = global.mongoose

if(!cached) { 
    cached = global.mongoose = {
    conn: null,
    promise: null,
}}

export default async function dbConnect() {
    
    if(mongoose.connection.readyState >= 1) {
        console.log('connected from previous');
        return cached.conn
    }
    if(mongoose.connection.readyState == 0)  {
        const opts ={
            bufferCommands: true, 
        }
        cached.promise = mongoose.connect(MONGODB_URI, opts).then(mongoose => {
            console.log('DB connected')
            return mongoose
        })
    }
    try {
        cached.conn = await cached.promise
    }catch(e) {
        cached.promise = null
        throw e
    }

      return cached.conn
    }
