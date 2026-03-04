import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { ENV } from './lib/env.js';
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/health" ,(req,res)=>{
  res.status(200).json({msg:"success from health"});
});

app.get("/books" ,(req,res)=>{
  res.status(200).json({msg:"success from books"});
});

if(ENV.NODE_ENV === "production"){
  // Serve static files from frontend dist folder
  const frontendDist = path.join(__dirname, "../../frontend/dist");
  app.use(express.static(frontendDist));

  // SPA fallback: serve index.html for all unmatched routes
  app.get("/*" , (req,res)=>{
    res.sendFile(path.join(frontendDist, "index.html"));
  });
}

const PORT = ENV.PORT || 3000;
app.listen(PORT, ()=>console.log(`server is running on port ${PORT} https://localhost:${PORT}`));

