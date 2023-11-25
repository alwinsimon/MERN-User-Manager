//* ===================================================== DataBase Configuration =====================================================

import mongoose from "mongoose";

const connectDB = async () => {

    try {
        
        const connectMongoDB = await mongoose.connect(process.env.MONGO_URI);

        console.log(`Mongo DB connected successfully: ${connectMongoDB.connection.host}`);

    } catch (error) {
        
        console.error(`Error connecting to Mongo DB: ${error.message}`);

        process.exit(1);
        // Above line exits the process and here exit code is set to 1 to denote a unsuccessful process exit.
        // If not mentioned, it is zero by default which indicates successful execution and exit from the process.

    }

};


export default connectDB;