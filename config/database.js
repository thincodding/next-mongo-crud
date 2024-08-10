import mongoose from 'mongoose'

const connectDB = async() => {
    if(mongoose.connections[0].readyState){
        return true;
    }
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected")
        return true;
    }
    catch(err){
        console.log(err)
    }
}


export default connectDB;