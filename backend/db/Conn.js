import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const res = await mongoose.connect(process.env.MONGODB_URL)
        console.log('Database connected');
        console.log(`DB host: `, res.connection.host);
    } catch (error) {
        console.log("Error: ", error);
    }
}

export default connectDB