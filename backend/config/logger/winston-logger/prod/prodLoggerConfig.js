import path from "path";

import winston, { Logger, format } from "winston";
const { combine, timestamp } = format;

// Module to save logs to MongoDB
import { MongoDB } from "winston-mongodb";
require("winston-mongodb");


const productionLoggerConfig = () => {
  // Define the directory for log files
  const prodLogDirectory = path.join(__dirname, "../../../../../logs/backend/prod");

  // prodLogger configuration
  const prodLoggerConfig = {
    level: "debug",
    format: combine(timestamp(), winston.format.json()),
    defaultMeta: { service: process.env.APPLICATION_NAME },
    transports: [
      // Logger instance to log to console (terminal)
      // new winston.transports.Console(),

      // Logger instance to log errors to log file in logs directory.
      new winston.transports.File({
        filename: path.join(prodLogDirectory, "error.log"),
        level: "error",
      }),

      // Logger instance to log all logs to log file in logs directory.
      new winston.transports.File({
        filename: path.join(prodLogDirectory, "complete.log"),
      }),

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
  const productionServerlogger = winston.createLogger(prodLoggerConfig);
  return productionServerlogger;
};

export default productionLoggerConfig;
