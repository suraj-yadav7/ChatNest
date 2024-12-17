import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import morgan from "morgan"
import colors from "colors"

import authRouter from "./routes/auth.routes.js"
import messageRouter from "./routes/message.routes.js"
import cookieParser from "cookie-parser"

import connectDB from "./config/db.js"
import userRouter from "./routes/user.routes.js"

const app = express()
dotenv.config()

const port        = process.env.PORT || 8080
const mode        = process.env.NODE_MODE
const client_url  = process.env.CLIENT_URL

connectDB()
.then((val)=>{
    console.log(`MongoDB is connected: ${val}`.bgGreen.white)
    // Hosting server when db is connected
    app.listen(port , ()=>{
        console.log(`Server is running in ${mode} environment at ${port}`.bgCyan.white)
    })
})
.catch((error)=>{
    console.log(`Mongodb failed to connect: ${error}`.bgRed.white)
})

app.get("/", (req, res)=>{
    res.send("<h1>Chat WebApp </h1>")
});
const corsOption={
    origin     : client_url,
    mmethod    : ['GET',"POST", "PUT", "DELETE"],
    credentials: true,
    optionSuccessStatus:200
}
app.use(cors(corsOption))
app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))

// User Auth
app.use("/api/auth",    authRouter);
app.use("/api/message", messageRouter);
app.use("/api/user",    userRouter);
