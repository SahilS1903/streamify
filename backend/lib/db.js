import mongoose from "mongoose";

export const connectDB =async()=>{
    try{
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log("MongoDB connected");
    }
    catch(err){
        console.log("Error connecting to MongoDB",err)
        process.exit(1); // Exit process with failure
    }
}