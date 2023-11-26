//* ===================================================== DataBase Configuration =====================================================

import mongoose from "mongoose";

const connectDB = async () => {

    try {
        
        const connectMongoDB = await mongoose.connect(process.env.MONGO_DB_URI);

        console.log(`${process.env.APPLICATION_NAME} connected to ${connectMongoDB.connection.host} Mongo DB successfully !!!`);

    } catch (error) {
        
        console.error(`Error connecting to Mongo DB: ${error.message}`);

        throw new Error(`Error connecting to Mongo DB: ${error.message}`);

    }

};


export default connectDB;