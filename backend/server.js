import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import ProductRoutes from "./routes/product.routes.js"
import cors from "cors"

const app=express();
app.use(cors({
    origin: "http://localhost:5173",
}))

dotenv.config();
app.use(express.json());  //allows as to accept the json data in the req.body
                                                                    
const PORT=process.env.PORT
// app.send("/e-commerse-website",(req,res)=>{                         
//     res.send("ready t m")                                         
// });                                                               
app.use("/api/v1",ProductRoutes);


app.listen(PORT,()=>{
    connectDB();
    console.log('server start at port http://localhost:5000 ');
})
 
// KV8ZXKsLz7HMP3GW