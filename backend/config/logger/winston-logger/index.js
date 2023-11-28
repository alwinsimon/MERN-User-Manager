// ================== Logger Configurations =================

import { Logger } from "winston";

import developmentLoggerConfig from "./dev/devLoggerConfig";
import productionLoggerConfig from "./prod/prodLoggerConfig";

let logger = null;

if (process.env.NODE_ENV === "development") {
  logger = developmentLoggerConfig();
}

if (process.env.NODE_ENV === "production") {
  logger = productionLoggerConfig();
}

export default logger;
