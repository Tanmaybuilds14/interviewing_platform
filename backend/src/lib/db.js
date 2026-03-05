import mongoose from 'mongoose';
import { ENV } from './env.js';


export const connectDB = async() =>{
  try {
    if(!ENV.DB_URL){
      throw new Error("DB_URL is not defined in enviroment variable");
    }
    const conn = await mongoose.connect(ENV.DB_URL)
    console.log("connected to mongoDB:",conn.connection.host)
  } catch (error) {
    console.error("Error connecting mongoDB");
    process.exit(0);
  }

}