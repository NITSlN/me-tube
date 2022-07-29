import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import videoRouter  from "./routes/video.js";
import commentsRouter from "./routes/comments.js";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser'
import cors from'cors'
const app = express()

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));

dotenv.config()


// 'https://me-tube-23.netlify.app/'
//Connecting to DB
const connect = ()=>{
    mongoose.connect(process.env.MONGO_URI).then(()=> console.log("Mongo Connected")).catch((err)=> console.log(err))
}

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/api/auth',authRouter)
app.use('/api/users',userRouter)
app.use('/api/videos',videoRouter)
app.use('/api/comments',commentsRouter)

//error handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
      success: false,
      status,
      message,
    });
  });
  



app.listen(process.env.PORT || 3001,()=> {
        connect()
        console.log("Running on port 3001")
    }
)



