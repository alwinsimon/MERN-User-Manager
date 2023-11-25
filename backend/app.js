//* ================================================ Express App Configuration ================================================

// ===================== Importing necessary modules =====================
import express from "express";

import cookieParser from "cookie-parser";

// Custom Authentication middleware from my npm package.
// Reference: https://www.npmjs.com/package/base-auth-handler
import { currentUser } from "base-auth-handler";

// ===================== Importing necessary files =====================
import v1APIs from "./routes/api-v1-routes.js";
import {
  notFoundErrorHandler,
  errorHandler,
} from "./middlewares/errorMiddleware.js";

// Express app configuration
const app = express();

// ===================== Setting Static Folder =====================
app.use(express.static("backend/Public"));

// ========================================== Middleware's ==========================================

app.use(cookieParser()); // CookieParser Middleware

app.use(express.json()); // Body parser Middleware from Express

app.use(express.urlencoded({ extended: true })); // Form Data parser Middleware from Express

//? ===================== Application Home Route =====================
app.get("/health", (req, res) => {
  const currentDate = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "UTC",
  };
  const formattedDate = currentDate.toLocaleString("en-US", options);

  res.status(200).json({
    status: `${process.env.APPLICATION_NAME} and Systems are Up & Running.`,
    dateTime: formattedDate,
  });
});

// Custom Authentication middleware from my npm package.
// Reference: https://www.npmjs.com/package/base-auth-handler
app.use(currentUser);

//? ===================== Routes Configuration =====================
// =====================V1 APIs Routes Configuration =================
app.use("/api/v1", v1APIs);

//? ===================== Error handler middleware configuration =====================
app.use(notFoundErrorHandler);
app.use(errorHandler);

export { app };
