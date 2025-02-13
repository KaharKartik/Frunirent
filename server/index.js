import express from 'express';
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from "dotenv"
import morgan from 'morgan'
import authRoute from "./routes/Auth_routes.js"
import productRoute from "./routes/Product_routes.js"
import orderRoute from "./routes/Order_routes.js"
import cookieParser from "cookie-parser"

const app = express()
dotenv.config();
app.use(cors())
app.use(cookieParser());
app.use(express.json())
app.use(morgan('dev'))
app.use("/api/auths", authRoute);
app.use("/api/product", productRoute);
app.use("/api/order", orderRoute);

mongoose.connect(
    process.env.MONGO,
  ).then(()=>{
    console.log("connected to database");
  })
//   mongoose.connection.on('connected', () => {
//     console.log('Mongoose connected to MongoDB');
//   });
app.listen(process.env.PORT,()=>{
    console.log("live ");
})

app.get("/data/:id",(req,res)=>{
  const {id} = req.params
    // return res.status(200).send({message:"hello",jugraj:"master"})
    return res.status(200).send({
      message:"email is required / email not found ",
      id:id
  })
})