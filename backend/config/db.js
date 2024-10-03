import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()
const mongo_uri = process.env.MONGO_URI

const connectDB = async()=>{
    try{
        const connectionInstance = await mongoose.connect(mongo_uri, {
            dbName:"ChatNest"
        })
        return connectionInstance.connection.host
    }
    catch(error){
        throw error
    }
};

export default connectDB;