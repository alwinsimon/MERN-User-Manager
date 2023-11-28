// ===================== Configuring Environment Variables =====================
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import winston, { Logger, format } from "winston";
const { combine, timestamp } = format;

// Module to save logs to MongoDB
import winstonMongoDB from "winston-mongodb";

// Define the directory for log files internally
// const logsDirectory = "../../../../logs"

// Logger configuration
const loggerConfiguration = {
  level: "debug",
  format: combine(timestamp(), winston.format.json()),
  defaultMeta: { service: process.env.APPLICATION_NAME },
  transports: [
    // // Logger instance to log to console (terminal)
    // new winston.transports.Console(),

    // // Logger instance to log errors to log file in logs directory.
    // new winston.transports.File({
    //   filename: path.join(logsDirectory, "error.log"),
    //   level: "error",
    // }),

    // // Logger instance to log all logs to log file in logs directory.
    // new winston.transports.File({
    //   filename: path.join(logsDirectory, "complete.log"),
    // }),

    // Logger instance to log all logs to MongoDB.
    new winston.transports.MongoDB({
      level: "debug",
      db: process.env.MONGO_DB_URI,
      options: { useUnifiedTopology: true },
      collection: "server_logs",
      storeHost: true,
      format: combine(timestamp(), winston.format.json()),
    }),
  ],
};

// Create and return the logger
const logger = winston.createLogger(loggerConfiguration);

export default logger;
