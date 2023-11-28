//* ===================================================== DataBase Configuration =====================================================

import mongoose from "mongoose";
import logger from "./logger/winston-logger/loggerConfig.js";

const connectDB = async () => {

    try {
        
        const connectMongoDB = await mongoose.connect(process.env.MONGO_DB_URI);

        console.log(`${process.env.APPLICATION_NAME} connected to ${connectMongoDB.connection.host} Mongo DB successfully !!!`);

        logger.info(`${process.env.APPLICATION_NAME} connected to ${connectMongoDB.connection.host} Mongo DB successfully.`);

    } catch (error) {
        
        console.error(`Error connecting ${process.env.APPLICATION_NAME} Server to Mongo DB: ${error.message}`);

        logger.info(`Error connecting ${process.env.APPLICATION_NAME} Server to Mongo DB: ${error}`);

        throw new Error(`Error connecting ${process.env.APPLICATION_NAME} Server to Mongo DB: ${error.message}`);

    }

};


export default connectDB;