import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';

const uri = "mongodb://0.0.0.0:27017/";
const client = new MongoClient(uri);

const connectDB = async () => {
    try {
        await mongoose.connect( 'mongodb+srv://DBUser:CTYZ0FzuiySbUbp5@cluster0.ybphyht.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log('MongoDB connected...');
    } catch (err:any) {
        console.error(err.message);
        process.exit(1);
    }
};

export default connectDB;