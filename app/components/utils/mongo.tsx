// db.ts
import mongoose from 'mongoose';

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@swe431.wgykbhi.mongodb.net/?retryWrites=true&w=majority`; // replace with your MongoDB connection string

const connectToDatabase = async () => {
  try {
    await mongoose.connect(uri, {
      
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default connectToDatabase;
