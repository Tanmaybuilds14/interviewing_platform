import express from 'express';
import path from 'path';
import { ENV } from './lib/env.js';
import { connectDB } from './lib/db.js';
import cors from 'cors';
import {serve} from "inngest/express";
import { inngest } from './lib/inngest.js';
import { functions } from './lib/inngest.js';
const app = express();


const __dirname=path.resolve();

app.use(express.json())
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}));//credentials:true = allows browser to include cookies on request

app.use("/api/inngest", serve({client:inngest , functions}));

app.get("/health" ,(req,res)=>{
  res.status(200).json({msg:"success from health"});
});

app.get("/books" ,(req,res)=>{
  res.status(200).json({msg:"success from books"});
});

if(ENV.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")));

  app.get("/{*any}" , (req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend", "dist" , "index.html"));
  });
}


const Startserver = async() =>{
  try {
    await connectDB();
    app.listen(3000, ()=>{
    console.log(`server is running on port ${ENV.PORT} https://localhost:3000`);
    connectDB();
    });
  } catch (error) {
    console.error("error starting the server",error);
  }
}

Startserver();

