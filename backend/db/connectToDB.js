import mongoose from 'mongoose';

const connectToMongoDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URI,
            {serverSelectionTimeoutMS: 5000,}
        );
        console.log("Connected To MongoDB");
    } catch (error) {
        console.log("Error Connecting To MongoDB", error.message);
    }
};

export default connectToMongoDB;