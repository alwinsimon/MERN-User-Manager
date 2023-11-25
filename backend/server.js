//* ===================================================== Server Configuration =====================================================

// ===================== Importing necessary modules =====================
import express from "express";

// ===================== Configuring Environment Variables =====================
import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";

// ===================== Importing necessary files =====================
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import {
  notFoundErrorHandler,
  errorHandler,
} from "./middlewares/errorMiddleware.js";

// Server port configuration
const PORT = process.env.PORT || 5000;

// Express app configuration
const app = express();

// ===================== Database Configuration =====================
connectDB();

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

//? ===================== Routes Configuration =====================
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

//? ===================== Error handler middleware configuration =====================
app.use(notFoundErrorHandler);
app.use(errorHandler);

//NOTE ===================== Starting Server =====================
app.listen(PORT, () => {
  console.log(
    `${process.env.APPLICATION_NAME} SERVER is LIVE & Listening on PORT ${PORT}.........`
  );
});
